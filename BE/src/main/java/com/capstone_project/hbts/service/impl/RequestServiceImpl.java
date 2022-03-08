package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.repository.HotelRepository;
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

    private final HotelRepository hotelRepository;

    public RequestServiceImpl(RequestRepository requestRepository, HotelRepository hotelRepository) {
        this.requestRepository = requestRepository;
        this.hotelRepository = hotelRepository;
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

    @Override
    @Transactional
    public void acceptRequest(int requestId) {
        log.info("Request to accept a request for admin");
        // update request status to 2 - approved
        requestRepository.acceptRequest(requestId);
        // get hotel id to accept, ready to on stage
        int hotelId = requestRepository.getRequestById(requestId).getHotel().getId();
        // update hotel status
        hotelRepository.enableHotel(hotelId);
    }

    @Override
    @Transactional
    public void denyRequest(int requestId) {
        log.info("Request to deny a request for admin");
        // update request status to 2 - approved
        requestRepository.denyRequest(requestId);
        // get hotel id to deny
        int hotelId = requestRepository.getRequestById(requestId).getHotel().getId();
        // delete this hotel
        hotelRepository.denyHotelById(hotelId);
    }

}
