package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.request.PostHotelRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.security.jwt.JwtTokenUtil;
import com.capstone_project.hbts.service.RequestService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@Log4j2
@RequestMapping("api/v1")
public class RequestResource {

    private final RequestService requestService;

    private final JwtTokenUtil jwtTokenUtil;

    public RequestResource(RequestService requestService, JwtTokenUtil jwtTokenUtil) {
        this.requestService = requestService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    /**
     * @param jwttoken
     * @apiNote for provider to add their request to post hotel after completing
     * enough hotel information
     * @return
     */
    @PostMapping("/add-request")
    public ResponseEntity<?> addRequestPostHotel(@RequestHeader("Authorization") String jwttoken,
                                                 @RequestBody PostHotelRequest postHotelRequest){
        log.info("REST request to add new request to post hotel for provider");

        int providerId = Integer.parseInt(jwtTokenUtil.getUserIdFromToken(jwttoken.substring(7)));
        // set provider id
        postHotelRequest.setProviderId(providerId);
        try{
            requestService.addNewRequest(postHotelRequest);

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
