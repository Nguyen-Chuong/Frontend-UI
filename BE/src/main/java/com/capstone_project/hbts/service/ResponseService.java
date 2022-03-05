package com.capstone_project.hbts.service;

import com.capstone_project.hbts.request.ResponseRequest;

public interface ResponseService {

    /**
     * @param responseRequest
     * @return
     */
    void sendResponseFromFeedback(ResponseRequest responseRequest);

}
