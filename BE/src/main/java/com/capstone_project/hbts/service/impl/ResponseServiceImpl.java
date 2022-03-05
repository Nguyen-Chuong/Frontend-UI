package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.repository.ResponseRepository;
import com.capstone_project.hbts.repository.UserRepository;
import com.capstone_project.hbts.request.ResponseRequest;
import com.capstone_project.hbts.service.ResponseService;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Service
@Log4j2
public class ResponseServiceImpl implements ResponseService {

    private final ResponseRepository responseRepository;

    private final UserRepository userRepository;

    public ResponseServiceImpl(ResponseRepository responseRepository, UserRepository userRepository) {
        this.responseRepository = responseRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void sendResponseFromFeedback(ResponseRequest responseRequest) {
        log.info("Request to send a response from feedback");
        // get user id from username
        int userId = userRepository.getUserId(responseRequest.getUsername());
        // get current timestamp
        responseRequest.setModifyDate(new Timestamp(System.currentTimeMillis()));
        responseRepository.sendResponseFromFeedback(responseRequest.getAdminId(), responseRequest.getMessage(),
                responseRequest.getModifyDate(), userId, responseRequest.getFeedbackId());
    }

}
