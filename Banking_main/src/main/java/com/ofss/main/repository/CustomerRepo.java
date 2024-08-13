package com.ofss.main.repository;

import org.springframework.data.repository.CrudRepository;

import com.ofss.main.domain.Customer;

public interface CustomerRepo extends CrudRepository<Customer, Integer>{
	public Customer findByusername(String username); 
}
