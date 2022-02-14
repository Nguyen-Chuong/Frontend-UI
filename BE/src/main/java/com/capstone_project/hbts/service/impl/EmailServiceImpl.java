package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.entity.Email;
import com.capstone_project.hbts.repository.EmailRepository;
import com.capstone_project.hbts.service.EmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailServiceImpl implements EmailService {

    private final EmailRepository emailRepository;

    private final JavaMailSender sender;

    public EmailServiceImpl(EmailRepository emailRepository, JavaMailSender sender){
        this.emailRepository = emailRepository;
        this.sender = sender;
    }

    @Override
    public void send(String to, String subject, String content) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom("minhtrung130414@gmail.com");
        mail.setTo(to);
        mail.setSubject(subject);
        mail.setText(content);
        sender.send(mail);
    }

    @Override
    public List<Email> getContent(String subject) {
        return emailRepository.findAllBySubject(subject);
    }

}
