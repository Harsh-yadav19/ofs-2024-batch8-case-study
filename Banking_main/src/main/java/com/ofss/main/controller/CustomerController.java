package com.ofss.main.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ofss.main.domain.Customer;
import com.ofss.main.service.CustomerService;
import com.ofss.main.service.CustomerService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api")
public class CustomerController {
	
	@Autowired
	public CustomerService customerservice;
	
	//http://localhost:8080/api/customer
	@GetMapping("customer/{customer_id}")
	private Customer getCustomer(@PathVariable int customer_id) {
		return customerservice.getCustomer(customer_id);
	}
	
	@PostMapping("customer/addcustomer")
	private Customer addCustomer(@RequestBody Customer customer) {
		
		return customerservice.addCustomer(customer);
	}
	
	@PostMapping("customer/logincustomer")
	private Customer loginCustomer(@RequestBody Map<String,Object> logindetails) {
		Customer loggedin = customerservice.logincustomer(logindetails);
		if(loggedin!=null) {
			return loggedin;
		}	
		System.out.println("invalid username");
		return null;
	}
	
}
