package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.constants.ValidateConstant;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.EmailService;
import com.capstone_project.hbts.service.OTPService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@Log4j2
@RequestMapping("api/v1")
public class EmailResource {

    private final EmailService emailService;

    private final OTPService otpService;

    public EmailResource(EmailService emailService, OTPService otpService) {
        this.emailService = emailService;
        this.otpService = otpService;
    }

    /**
     * @param email
     * return
     * @apiNote server
     */
    @PostMapping("authenticate/generateOtp")
    public ResponseEntity<?> generateOtp(@RequestParam String email){
        log.info("REST request to generate otp and send email to user");

        try {
            int otp = otpService.generateOtp(email);
            emailService.send(email, ValidateConstant.EMAIL_SUBJECT, ValidateConstant.OTP_MESSAGE + otp);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, otp,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @param email
     * @param otp
     * return
     * @apiNote server
     */
    @PostMapping("authenticate/verifyOtp")
    public ResponseEntity<?> verifyOtp(@RequestParam String email,
                                       @RequestParam int otp){
        log.info("REST request to verify otp that user sent");

        try {
            // verify otp and otpCache
            int serverOtp = otpService.getOtp(email);
            if(otp <= 0){
                return ResponseEntity.badRequest()
                        .body(new ApiResponse<>(400, null,
                                ErrorConstant.ERR_OTP_001, ErrorConstant.ERR_OTP_001_LABEL));
            }
            if(serverOtp <= 0){
                return ResponseEntity.badRequest()
                        .body(new ApiResponse<>(400, null,
                                ErrorConstant.ERR_OTP_002, ErrorConstant.ERR_OTP_002_LABEL));
            }
            if(otp == serverOtp){
                otpService.clearOtp(email);
                return ResponseEntity.ok()
                        .body(new ApiResponse<>(200, null,
                                null, null));
            }else {
                return ResponseEntity.ok()
                        .body(new ApiResponse<>(400, null,
                                ErrorConstant.ERR_OTP_003, ErrorConstant.ERR_OTP_003_LABEL));
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
