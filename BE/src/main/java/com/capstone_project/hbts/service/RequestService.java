package com.capstone_project.hbts.service;

import com.capstone_project.hbts.request.PostHotelRequest;

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

}
