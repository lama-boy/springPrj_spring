package com.trickle.os.vo;

public class PD {
	String tableName;
	String[] columns;
	
	public void setColumns(String... columns) {
		this.columns = columns;
	}
	
	public static void main(String[] args) {
		PD pd = new PD();
		pd.setColumns("ID","PW");
	}
}
