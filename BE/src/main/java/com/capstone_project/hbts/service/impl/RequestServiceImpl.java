package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.repository.RequestRepository;
import com.capstone_project.hbts.request.PostHotelRequest;
import com.capstone_project.hbts.service.RequestService;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Service
@Log4j2
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;

    public RequestServiceImpl(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @Override
    @Transactional
    public void addNewRequest(PostHotelRequest postHotelRequest) {
        log.info("Request to add a new request to post hotel for provider");
        // get current timestamp
        postHotelRequest.setRequestDate(new Timestamp(System.currentTimeMillis()));
        // set status to 1-pending, await admin to process
        postHotelRequest.setStatus(1);
        requestRepository.addNewRequest(postHotelRequest.getRequestDate(),
                postHotelRequest.getStatus(),
                postHotelRequest.getHotelId(),
                postHotelRequest.getProviderId());
    }

}
