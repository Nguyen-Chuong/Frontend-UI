package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.Feedback.FeedbackDTO;
import com.capstone_project.hbts.request.FeedbackRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

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
    Page<FeedbackDTO> viewPageUserFeedback(Pageable pageable);

    /**
     * @param userId
     * @return
     */
    List<FeedbackDTO> getListAnUserFeedback(int userId);

}
