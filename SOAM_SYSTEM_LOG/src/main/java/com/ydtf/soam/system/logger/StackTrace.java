package com.ydtf.soam.system.logger;

public class StackTrace {
	private String declaringClass;
	private String methodName;
	private String fileName;
	private Integer lineNumber;

	public String getDeclaringClass() {
		return declaringClass;
	}

	public void setDeclaringClass( String declaringClass ) {
		this.declaringClass = declaringClass;
	}

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName( String methodName ) {
		this.methodName = methodName;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName( String fileName ) {
		this.fileName = fileName;
	}

	public Integer getLineNumber() {
		return lineNumber;
	}

	public void setLineNumber( Integer lineNumber ) {
		this.lineNumber = lineNumber;
	}
}
