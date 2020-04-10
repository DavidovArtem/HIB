package com.project.dao;

import com.project.model.FeedbackRequest;

import java.util.List;

public interface FeedbackRequestDAO {
    List<FeedbackRequest> findAll();

    List<FeedbackRequest> findAllByOrderByRepliedAsc();

    FeedbackRequest getById(Long id);

    FeedbackRequest save(FeedbackRequest feedbackRequest);

    List<FeedbackRequest> getByReplied(Boolean replied);
}
