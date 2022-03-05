package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.Feedback.ResponseDTO;
import com.capstone_project.hbts.request.ResponseAdminRequest;
import com.capstone_project.hbts.request.ResponseUserRequest;

import java.util.List;

public interface ResponseService {

    /**
     * @param responseAdminRequest
     * @return
     */
    void sendResponseToUser(ResponseAdminRequest responseAdminRequest);

    /**
     * @param responseUserRequest
     * @return
     */
    void sendResponseToAdmin(ResponseUserRequest responseUserRequest);

    /**
     * @param feedbackId
     * @return
     */
    List<ResponseDTO> getAllResponseByFeedbackId(int feedbackId);

}
