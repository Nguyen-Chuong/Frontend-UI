package com.capstone_project.hbts.service;

import com.capstone_project.hbts.request.ResponseAdminRequest;
import com.capstone_project.hbts.request.ResponseUserRequest;

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

}
