package com.capstone_project.hbts.service;

import com.capstone_project.hbts.entity.Email;

import java.util.List;

public interface EmailService {
    /**
     * send email
     */
    void send(String to, String subject, String content);

    /**
     * get content email
     */
    List<Email> getContent(String subject);

}
