package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.constants.ValidateConstant;
import com.capstone_project.hbts.dto.Feedback.FeedbackDTO;
import com.capstone_project.hbts.request.FeedbackRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.response.DataPagingResponse;
import com.capstone_project.hbts.security.jwt.JwtTokenUtil;
import com.capstone_project.hbts.service.FeedbackService;
import com.capstone_project.hbts.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@Log4j2
@RequestMapping("api/v1")
public class FeedbackResource {

    private final FeedbackService feedbackService;

    private final UserService userService;

    private final JwtTokenUtil jwtTokenUtil;

    public FeedbackResource(FeedbackService feedbackService, UserService userService, JwtTokenUtil jwtTokenUtil) {
        this.feedbackService = feedbackService;
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/send-feedback")
    public ResponseEntity<?> sendFeedback(@RequestBody FeedbackRequest feedbackRequest){
        log.info("REST request to send user feedback");

        try {
            feedbackService.sendFeedback(feedbackRequest);
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

    @GetMapping("/get-all-feedback")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
    public ResponseEntity<?> getAllFeedback(@RequestParam(defaultValue = ValidateConstant.PAGE) int page,
                                            @RequestParam(defaultValue = ValidateConstant.PER_PAGE) int pageSize){
        log.info("REST request to get all user's feedback");

        try {
            Page<FeedbackDTO> feedbackDTOPage = feedbackService.viewPageUserFeedback(PageRequest.of(page, pageSize));

            DataPagingResponse<?> dataPagingResponse = new DataPagingResponse<>(feedbackDTOPage.getContent(),
                    feedbackDTOPage.getTotalElements(), page, feedbackDTOPage.getSize());

            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, dataPagingResponse,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    @GetMapping("/search-feedback")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
    public ResponseEntity<?> searchFeedbackOfAnUser(@RequestParam String username){
        log.info("REST request to get an user's feedback");
        int userId;

        try{
            userId = userService.getUserId(username);
        }catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_USER_006, ErrorConstant.ERR_USER_006_LABEL));
        }

        try {
            List<FeedbackDTO> feedbackDTOList = feedbackService.getListAnUserFeedback(userId);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, feedbackDTOList,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    @GetMapping("/feedback")
    public ResponseEntity<?> getListFeedback(@RequestHeader("Authorization") String jwttoken){
        log.info("REST request to get user's feedbacks that sent");

        String username = jwtTokenUtil.getUsernameFromToken(jwttoken.substring(7));

        int userId = userService.getUserId(username);

        try {
            List<FeedbackDTO> feedbackDTOList = feedbackService.getListAnUserFeedback(userId);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, feedbackDTOList,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
