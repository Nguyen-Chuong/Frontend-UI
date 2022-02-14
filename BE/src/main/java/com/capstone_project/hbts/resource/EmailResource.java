package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.constants.ValidateConstant;
import com.capstone_project.hbts.request.UserRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.EmailService;
import com.capstone_project.hbts.service.OTPService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class EmailResource {
    private final EmailService emailService;

    private final OTPService otpService;

    public EmailResource(EmailService emailService, OTPService otpService) {
        this.emailService = emailService;
        this.otpService = otpService;
    }

    @PostMapping("/generateOtp")
    public ApiResponse<String> generateOtp(@RequestBody UserRequest user){
        try {
            int otp = otpService.generateOtp();
            emailService.send(user.getEmail(), ValidateConstant.EMAIL_SUBJECT, ValidateConstant.OTP_MESSAGE + otp);
            return new ApiResponse(200, null, null);
        }catch (Exception e){
            return new ApiResponse(400,ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

    @PostMapping("/verifyOtp")
    public ApiResponse<String> verifyOtp(@RequestParam String Otp){
        try {
            // verify otp and otpCache
            int otpVerify = Integer.parseInt(Otp);
            int serverOtp = otpService.getOtp("otpServer");
            if(otpVerify <= 0){
                return new ApiResponse(400,ErrorConstant.ERR_OTP_001,ErrorConstant.ERR_OTP_001_LABEL);
            }
            if(serverOtp <= 0){
                return new ApiResponse(400,ErrorConstant.ERR_OTP_002,ErrorConstant.ERR_OTP_002_LABEL);
            }
            if(otpVerify == serverOtp){
                otpService.clearOtp("otpServer");
                return new ApiResponse(200, null, null);
            }else {
                return new ApiResponse(400,ErrorConstant.ERR_OTP_003,ErrorConstant.ERR_OTP_003_LABEL);
            }
        }catch (Exception e){
            return new ApiResponse(400,ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }
}
