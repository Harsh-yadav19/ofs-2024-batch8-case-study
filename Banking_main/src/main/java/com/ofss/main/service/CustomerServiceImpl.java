package com.ofss.main.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ofss.main.domain.Customer;
import com.ofss.main.repository.CustomerRepo;

@Service
public class CustomerServiceImpl implements CustomerService{

	@Autowired
	private CustomerRepo customerrepo;
	
	@Override
	public Customer getCustomer(int customer_id) {
		// TODO Auto-generated method stub
		Optional<Customer> getdata= customerrepo.findById(customer_id);
		if(getdata.isPresent()) {
			return getdata.get();
		}
		return null;
		
	}

	@Override
	public Customer addCustomer(Customer customer) {
		// TODO Auto-generated method stub
		return customerrepo.save(customer);
	}

	@Override
	public Customer logincustomer(Map<String, Object> logindetails) {
		// TODO Auto-generated method stub
		String name = (String) logindetails.get("username");
		String password = (String) logindetails.get("password");
		Customer customer1 = customerrepo.findByusername(name);
		
		if (customer1!=null) {
			if(customer1.getStatus().equalsIgnoreCase("Blocked")) {
				return customer1;
			}
			else {
			if(customer1.getPassword().equals(password)) {
				customer1.setNo_of_attempts(0);
				customer1=customerrepo.save(customer1);
				return customer1;
			}
			else {
				if(customer1.getNo_of_attempts()>=3) {
					customer1.setStatus("Blocked");
					customer1=customerrepo.save(customer1);
					return customer1;
				}
				customer1.setNo_of_attempts(customer1.getNo_of_attempts()+1);
				customer1=customerrepo.save(customer1);
				return customer1;
				}
			}
		}
		return null;
	}
	
}
