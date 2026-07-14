package com.mediassist.repository;

import com.mediassist.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByUserId(String userId);
    List<Appointment> findByStatus(String status);
}
