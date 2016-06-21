package net.hrobotics.sk.bot;

import com.google.appengine.api.urlfetch.*;
import com.google.appengine.repackaged.com.google.api.client.util.Base64;
import com.google.appengine.repackaged.org.codehaus.jackson.map.ObjectMapper;
import com.google.appengine.repackaged.org.joda.time.DateTime;
import net.hrobotics.sk.bot.telegram.model.Message;
import net.hrobotics.sk.bot.telegram.model.SendMessage;
import net.hrobotics.sk.bot.telegram.model.Update;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.StringTokenizer;
import java.util.UUID;
import java.util.logging.Logger;

public class SKBotServlet extends HttpServlet {
    private static final Logger LOG = Logger.getLogger(SKBotServlet.class.getName());

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Message message = mapper.readValue(req.getInputStream(), Update.class).getMessage();
            URLFetchService urlFetchService = URLFetchServiceFactory.getURLFetchService();
            FetchOptions fetchOptions = FetchOptions.Builder.withDefaults();
            fetchOptions.doNotValidateCertificate();
            fetchOptions.doNotFollowRedirects();////!!!!!!!!!
            fetchOptions.setDeadline(30D);
            HTTPRequest request = new HTTPRequest(new URL("https://api.telegram.org/bot182606078:AAHePOvrPQkAHm6g51p6d9BERhdGHOrstts/sendMessage"), HTTPMethod.POST, fetchOptions);
            String text = message.getText();
            LOG.info("message: " + text);

            String response = handle(text);

            byte[] payload = mapper.writeValueAsBytes(new SendMessage(message.getChat().getId(), response));
            LOG.info(new String(payload));
            request.addHeader(new HTTPHeader("Content-Type", "application/json"));
            request.setPayload(payload);
            HTTPResponse httpResponse = urlFetchService.fetch(request);
            LOG.info(new String(httpResponse.getContent()));
        } catch (Exception e) {
            LOG.severe("error: " + e.getMessage());
        }
    }

    private String handle(String text) throws UnsupportedEncodingException {
        StringTokenizer tokenizer = new StringTokenizer(text);
        String token = tokenizer.nextToken();
        if(token.startsWith("/")) {
            Commands command;
            try {
                command = Commands.valueOf(token.substring(1));
            } catch (IllegalArgumentException e) {
                return help();
            }
            switch (command) {
                case decodeURI:
                    return URLDecoder.decode(tokenizer.nextToken(), "UTF-8");
                case encodeURI:
                    return URLEncoder.encode(tokenizer.nextToken(), "UTF-8");
                case decodeBase64:
                    return new String(Base64.decodeBase64(tokenizer.nextToken()));
                case encodeBase64:
                    return Base64.encodeBase64String(tokenizer.nextToken().getBytes());
                case textLowercase:
                    return tokenizer.nextToken().toLowerCase();
                case textUppercase:
                    return tokenizer.nextToken().toUpperCase();
                case timestamp:
                    return new DateTime(System.currentTimeMillis()).toString();
                case uuid:
                    return UUID.randomUUID().toString();
            }
        }
        return help();
    }

    private String help() {
        StringBuilder builder = new StringBuilder("supported commands: \n");
        for (Commands commands : Commands.values()) {
            builder.append("/").append(commands.name()).append("\n");
        }
        return builder.toString();
    }

    private enum Commands {
        decodeURI,
        encodeURI,
        decodeBase64,
        encodeBase64,
        textLowercase,
        textUppercase,
        timestamp,
        uuid
    }
}
