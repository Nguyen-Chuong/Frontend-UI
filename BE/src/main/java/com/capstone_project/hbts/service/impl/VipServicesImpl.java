package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.VipDTO;
import com.capstone_project.hbts.entity.Vip;
import com.capstone_project.hbts.repository.VipRepository;
import com.capstone_project.hbts.service.VipService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VipServicesImpl implements VipService {

    private final VipRepository vipRepository;

    private final ModelMapper modelMapper;

    public VipServicesImpl(VipRepository vipRepository, ModelMapper modelMapper) {
        this.vipRepository = vipRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<VipDTO> getVipStatus() {
        List<Vip> list = vipRepository.findAll();

        return list.stream().map( item -> modelMapper.map(item, VipDTO.class))
                .collect(Collectors.toList());
    }
}
