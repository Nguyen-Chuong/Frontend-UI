package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.request.ResponseAdminRequest;
import com.capstone_project.hbts.request.ResponseUserRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.ResponseService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@Log4j2
@RequestMapping("api/v1")
public class ResponseResource {

    private final ResponseService responseService;

    public ResponseResource(ResponseService responseService) {
        this.responseService = responseService;
    }

    /**
     * @param responseAdminRequest
     * return
     * @apiNote for manager/admin to send response
     */
    @PostMapping("/send-response/user")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
    public ResponseEntity<?> sendResponseToUser(@RequestBody ResponseAdminRequest responseAdminRequest){
        log.info("REST request to send response to user");

        try {
            responseService.sendResponseToUser(responseAdminRequest);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, null,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @param responseUserRequest
     * return
     * @apiNote for user to send response
     * if user click view feedback and see no response, disable button reply that they cannot call this api
     */
    @PostMapping("/send-response/admin")
    public ResponseEntity<?> sendResponseToAdmin(@RequestBody ResponseUserRequest responseUserRequest){
        log.info("REST request to send response to admin");

        try {
            responseService.sendResponseToAdmin(responseUserRequest);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, null,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
