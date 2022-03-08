package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.Request.RequestDTO;
import com.capstone_project.hbts.request.PostHotelRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RequestService {

    /**
     * add a request to post hotel for provider
     * @param postHotelRequest
     * @return
     */
    void addNewRequest(PostHotelRequest postHotelRequest);

    /**
     * for admin to accept a request
     * @param requestId
     * @return
     */
    void acceptRequest(int requestId);

    /**
     * for admin to deny a request
     * @param requestId
     * @return
     */
    void denyRequest(int requestId);

    /**
     * for admin to view all requests by status
     * @param status
     * @param pageable
     * @return
     */
    Page<RequestDTO> viewAllRequestByStatus(int status, Pageable pageable);

}
