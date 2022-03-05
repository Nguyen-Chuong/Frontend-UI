package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.Feedback.FeedbackDTO;
import com.capstone_project.hbts.request.FeedbackRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FeedbackService {

    /**
     * @param feedbackRequest
     * @return
     */
    void sendFeedback(FeedbackRequest feedbackRequest);

    /**
     * @param pageable
     * @return
     */
    Page<FeedbackDTO> viewListUserFeedback(Pageable pageable);

}
