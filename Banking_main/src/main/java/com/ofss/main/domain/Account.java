package com.ofss.main.domain;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


public class Account {
	
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "account_id")
    private int account_id;
    private Customer customer;
    private Date opening_date;
    private double minimum_balance;
    private double current_balance;
    private double roi; 
    private String account_type;
    public Account(Customer customer, double minimum_balance, double current_balance, double roi, String account_type) {
        this.customer = customer;
        this.minimum_balance = minimum_balance;
        this.current_balance = current_balance;
        this.roi = roi;
        this.account_type = account_type;
    }



    public Account(int account_id, Date opening_date, double minimum_balance, double current_balance, double roi,
        String account_type) {
        this.account_id = account_id;
        this.opening_date = opening_date;
        this.minimum_balance = minimum_balance;
        this.current_balance = current_balance;
        this.roi = roi;
        this.account_type = account_type;
    }



    public int getAccount_id() {
        return account_id;
    }
    public void setAccount_id(int account_id) {
        this.account_id = account_id;
    }
    public Customer getCustomer() {
        return customer;
    }
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    public Date getOpening_date() {
        return opening_date;
    }
    public void setOpening_date(Date opening_date) {
        this.opening_date = opening_date;
    }
    public double getMinimum_balance() {
        return minimum_balance;
    }
    public void setMinimum_balance(double minimum_balance) {
        this.minimum_balance = minimum_balance;
    }
    public double getCurrent_balance() {
        return current_balance;
    }
    public void setCurrent_balance(double current_balance) {
        this.current_balance = current_balance;
    }
    public double getRoi() {
        return roi;
    }
    public void setRoi(double roi) {
        this.roi = roi;
    }
    public String getAccount_type() {
        return account_type;
    }
    public void setAccount_type(String account_type) {
        this.account_type = account_type;
    }



    @Override
    public String toString() {
        return "Account [account_id=" + account_id + ", opening_date=" + opening_date + ", minimum_balance="
                + minimum_balance + ", current_balance=" + current_balance + ", roi=" + roi + ", account_type="
                + account_type + "]";
    }

    

    
    
}
