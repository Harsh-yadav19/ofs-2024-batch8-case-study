package com.ofss.main.service;

import java.util.Map;

import com.ofss.main.domain.Customer;

public interface CustomerService {
	public Customer getCustomer(int customer_id);
	
	public Customer addCustomer(Customer customer);
	
	public Customer logincustomer(Map<String,Object> logindetails);
}
