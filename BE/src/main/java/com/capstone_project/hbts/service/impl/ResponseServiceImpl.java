package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.repository.ResponseRepository;
import com.capstone_project.hbts.request.ResponseRequest;
import com.capstone_project.hbts.service.ResponseService;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Log4j2
public class ResponseServiceImpl implements ResponseService {

    private final ResponseRepository responseRepository;

    public ResponseServiceImpl(ResponseRepository responseRepository) {
        this.responseRepository = responseRepository;
    }

    @Override
    @Transactional
    public void sendResponseFromFeedback(ResponseRequest responseRequest) {
        log.info("Request to send a response from feedback");


    }
}
