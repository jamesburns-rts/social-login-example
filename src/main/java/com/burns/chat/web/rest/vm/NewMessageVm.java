package com.burns.chat.web.rest.vm;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author james
 * @since 12/19/18
 */
public class NewMessageVm {

    @NotNull
    @Size(min = 1)
    private String content;

    @NotNull
    private Long channelId;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getChannelId() {
        return channelId;
    }

    public void setChannelId(Long channelId) {
        this.channelId = channelId;
    }
}
