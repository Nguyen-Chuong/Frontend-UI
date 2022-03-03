package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.VipDTO;

import java.math.BigDecimal;
import java.util.List;

public interface VipService {

    /**
     * get all vip info
     * @param
     */
    List<VipDTO> getVipStatus();

    /**
     * update vip info
     * @param
     */
    void updateVipClass(int discount, BigDecimal rangeStart, BigDecimal rangeEnd, Integer id);

}
