package com.capstone_project.hbts.service;

import com.capstone_project.hbts.request.FeedbackRequest;

public interface FeedbackService {

    /**
     * @param feedbackRequest
     * @return
     */
    void sendFeedback(FeedbackRequest feedbackRequest);

}
