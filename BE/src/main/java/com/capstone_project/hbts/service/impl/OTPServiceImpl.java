package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.service.OTPService;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class OTPServiceImpl implements OTPService {
    //cache based on username and OPT MAX 8
    private static final Integer EXPIRE_MINS = 1;

    private LoadingCache<String, Integer> otpCache;

    public OTPServiceImpl(){
        otpCache = CacheBuilder.newBuilder().expireAfterAccess(EXPIRE_MINS , TimeUnit.MINUTES)
                .build(new CacheLoader<String, Integer>() {
                    @Override
                    public Integer load(String s) throws Exception {
                        return 0;
                    }
                });
    }

    //This method is used to push the opt number against Key. Rewrite the OTP if it exists
    // Using user id as key
    @Override
    public int generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        otpCache.put("otpServer", otp);
        return otp;
    }

    // This method is used to return the OPT number against Key->Key values is
    // username
    @Override
    public int getOtp(String key) {
        try {
            return otpCache.get(key);
        } catch (Exception e) {
            return 0;
        }
    }

    //This method is used to clear the OTP cache already
    @Override
    public void clearOtp(String key) {
        otpCache.invalidate(key);
    }

}
