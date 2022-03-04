package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.repository.FeedbackRepository;
import com.capstone_project.hbts.request.FeedbackRequest;
import com.capstone_project.hbts.service.FeedbackService;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Service
@Log4j2
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    @Transactional
    public void sendFeedback(FeedbackRequest feedbackRequest) {
        log.info("Request to send an user feedback");
        // get current timestamp
        feedbackRequest.setModifyDate(new Timestamp(System.currentTimeMillis()));
        feedbackRepository.sendFeedback(feedbackRequest.getType(), feedbackRequest.getSenderId(),
                feedbackRequest.getMessage(), feedbackRequest.getModifyDate());
    }

}
