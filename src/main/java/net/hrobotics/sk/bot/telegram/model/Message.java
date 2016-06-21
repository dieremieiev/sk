package net.hrobotics.sk.bot.telegram.model;

import com.google.appengine.repackaged.org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties({
        "message_id",
        "from",
        "date",
//        "chat",
        "forward_from",
        "forward_from_chat",
        "forward_date",
        "reply_to_message",
        "edit_date",
//        "text",
        "entities",
        "audio",
        "document",
        "photo",
        "sticker",
        "video",
        "voice",
        "caption",
        "contact",
        "location",
        "venue",
        "new_chat_member",
        "left_chat_member",
        "new_chat_title",
        "new_chat_photo",
        "delete_chat_photo",
        "group_chat_created",
        "supergroup_chat_created",
        "channel_chat_created",
        "migrate_to_chat_id",
        "migrate_from_chat_id",
        "pinned_message"})
public class Message {
    private Chat chat;
    private String text;

    public Message() {
    }

    public Message(Chat chat, String text) {
        this.chat = chat;
        this.text = text;
    }

    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
