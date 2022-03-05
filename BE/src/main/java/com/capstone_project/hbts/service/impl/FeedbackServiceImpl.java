package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.Feedback.FeedbackDTO;
import com.capstone_project.hbts.entity.Feedback;
import com.capstone_project.hbts.repository.FeedbackRepository;
import com.capstone_project.hbts.request.FeedbackRequest;
import com.capstone_project.hbts.response.CustomPageImpl;
import com.capstone_project.hbts.service.FeedbackService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    private final ModelMapper modelMapper;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository, ModelMapper modelMapper) {
        this.feedbackRepository = feedbackRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public void sendFeedback(FeedbackRequest feedbackRequest) {
        log.info("Request to send an user feedback");
        // get current timestamp
        feedbackRequest.setModifyDate(new Timestamp(System.currentTimeMillis()));
        // not yet processed
        feedbackRequest.setIsProcessed(0);
        feedbackRepository.sendFeedback(feedbackRequest.getType(), feedbackRequest.getSenderId(),
                feedbackRequest.getMessage(), feedbackRequest.getModifyDate());
    }

    @Override
    public Page<FeedbackDTO> viewPageUserFeedback(Pageable pageable) {
        log.info("Request to get all user feedback");

        Page<Feedback> feedbacks = feedbackRepository.findAllByOrderByModifyDateDesc(pageable);

        List<FeedbackDTO> feedbackDTOList = feedbacks.getContent()
                .stream()
                .map(item -> modelMapper.map(item, FeedbackDTO.class))
                .collect(Collectors.toList());

        for(int i = 0 ; i< feedbackDTOList.size(); i++){
            feedbackDTOList.get(i).setSenderName(feedbacks.getContent().get(i).getSender().getUsername());
        }

        return new CustomPageImpl<>(feedbackDTOList);
    }

    @Override
    public List<FeedbackDTO> getListAnUserFeedback(int userId) {
        log.info("Request to get list feedback of an user");

        return feedbackRepository.getUserFeedback(userId)
                .stream()
                .map(item -> modelMapper.map(item, FeedbackDTO.class))
                .collect(Collectors.toList());
    }

}
