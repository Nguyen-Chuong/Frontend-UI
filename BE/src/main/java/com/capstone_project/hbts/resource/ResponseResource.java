package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.request.ResponseRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.ResponseService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
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
     * @param responseRequest
     * return
     * @apiNote for user/admin to send response
     */
    @PostMapping("/send-response")
    public ResponseEntity<?> sendResponseFromFeedback(@RequestBody ResponseRequest responseRequest){
        log.info("REST request to send response");

        try {
            responseService.sendResponseFromFeedback(responseRequest);
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
