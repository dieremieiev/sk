package net.hrobotics.sk.bot.telegram.model;


import com.google.appengine.repackaged.org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties({
//        "id",
        "type",
        "title",
        "username",
        "first_name",
        "last_name"})
public class Chat {
    private Long id;

    public Chat() {
    }

    public Chat(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
