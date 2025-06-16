---
layout: default
title: AICWSA Exam Report
---

#  Windows Server Exam Report

- **Full Name:** Rishabh Soni  
- **Email:** email@rishabhsoni.in 
- **Date:** 10 March 2025  

---

## Table of Contents
1. **Question**  
2. **Machine Details**  
   - Server  
   - Client 1  
   - Client 2  
3. **DHCP Configuration**  
4. **DNS Configuration**  
5. **IIS Web Hosting**  
6. **Top Group Policies on the Sales OU**  
7. **Firewall Configuration**  
8. **Images**  

---

## Question
Your organization is enhancing its Windows Server infrastructure by configuring a DHCP server for dynamic IP allocation, enabling internal DNS resolution, and hosting a secure website on IIS with enforced HTTPS connections and automatic HTTP-to-HTTPS redirection. As a Windows Server Administrator, set up the DHCP server to automatically update DNS records for DHCP clients within the "ai.exam" domain. Additionally, deploy the top 10 Group Policy Objects (GPOs) to strengthen security and optimize the operational efficiency of all systems in the "Sales" department.

---

## Machine Details

### Server
- **Operating System**: Windows Server 2022
- **Username**: Administrator
- **Password**: rish@bh123
- **Hostname**: server1
- **Domain**: ai.exam

![image](https://github.com/user-attachments/assets/cb57d148-71f3-44da-b9e7-ed70cd4ae744)


### Client 1
- **Operating System**: Windows 11
- **Local Admin**: Dev Soni
- **Password**: ex@m@Dev1
- **Hostname**: pc1

![image](https://github.com/user-attachments/assets/5feb31c6-7b19-4873-a5a7-b375501b5d51)

### Client 2
- **Operating System**: Windows 11
- **Local Admin**: Max Soni
- **Password**: ex@m@Max1
- **Hostname**: pc2

  ![image](https://github.com/user-attachments/assets/60d9b66c-7950-460c-9641-220361d85b12)
  
---

## DHCP Configuration
- **Credentials to Authorize DHCP Server in AD DS**:
  - **User Name**: AI\Administrator
- **Scope Name**: ai.exam
- **IP Address Pool Range**: 
  - Start: 192.168.1.120
  - End: 192.168.1.220
  - Subnet Mask: 255.255.255.0
- **Exclusion Range**: No exclusion
- **Lease Duration**: 1 day
- **DHCP Options**:
  - **Default Gateway**: 192.168.1.1
  - **DNS Server**: 192.168.1.100

  ![image](https://github.com/user-attachments/assets/d262bcfd-2e11-40de-9e62-a2c62f35ea64)

- **Automatic DNS Updates**: Configured to automatically update DNS records for DHCP clients.

	![image](https://github.com/user-attachments/assets/904a5079-83a9-463f-b504-f1bc1c09ba46)

---

## DNS Configuration
- **Forward Lookup Zone**: ai.exam
- **Records**: 
  - **Host (A) Records**:
    - ai.exam: 192.168.1.100
    - server1: 192.168.1.100
  - **CNAME Record**: 
    - www → ai.exam
    
  ![image](https://github.com/user-attachments/assets/8686aa2c-81db-4cb4-97fc-32a633942812)

---

## IIS Web Hosting
- **Roles Added**: 
  - Web Server (IIS)

	![image](https://github.com/user-attachments/assets/379bf09f-3941-4565-984c-586d4b2d3a6c)

  ![image](https://github.com/user-attachments/assets/27c679c3-72fa-49ea-bbae-89eadd39462d)

- **Website Name**: ai.exam
- **Physical Path**: C:\inetpub\ai.exam

  ![image](https://github.com/user-attachments/assets/e8359521-ebb7-4778-9757-e70ac1b612a8)

- **Bindings**: 
  - HTTP: Port 80
  - HTTPS: Port 443

  ![image](https://github.com/user-attachments/assets/7c5cca8d-fdd7-4e65-a3ce-a8b5540c67f7)

- **HTTP Redirection**: Redirects all HTTP requests to HTTPS.

  ![image](https://github.com/user-attachments/assets/34482f59-17ef-44d5-8b20-613bebb12c89)

	![image](https://github.com/user-attachments/assets/24179358-5911-40cf-a4af-b1496e4a302b)
---

## Top Group Policies on the Sales OU
1. **Disable Removable Storage (Block USB Drives)**
   - Path: Computer Configuration → Policies → Administrative Templates → System → Removable Storage Access
2. **Prevent Changing Desktop Background**
   - Path: User Configuration → Policies → Administrative Templates → Control Panel → Personalization
3. **Restrict Control Panel and PC Settings Access**
   - Path: User Configuration → Policies → Administrative Templates → Control Panel
4. **Restrict Software Installation**
   - Path: Computer Configuration → Policies → Windows Settings → Security Settings → Software Restriction Policies
5. **Password Policy (Enforce Strong Passwords)**
   - Path: Computer Configuration → Policies → Windows Settings → Security Settings → Account Policies → Password Policy
6. **Restrict Remote Desktop (RDP) Access**
   - Path: Computer Configuration → Policies → Administrative Templates → Windows Components → Remote Desktop Services
7. **Block Remote Access to Registry Editor**
   - Path: Computer Configuration → Policies → Windows Settings → Security Settings → Local Policies → Security Options
8. **Restrict Access to Command Prompt (Prevent Running Scripts)**
   - Path: User Configuration → Policies → Administrative Templates → System
9. **Disable Guest Account**
   - Path: Computer Configuration → Policies → Windows Settings → Security Settings → Local Policies → Security Options
10. **Enable Windows Defender Firewall with Predefined Rules**
    - Path: Computer Configuration → Policies → Windows Settings → Security Settings → Windows Defender Firewall

---

## Firewall Configuration
- **Inbound Rules**:

![image](https://github.com/user-attachments/assets/d35c579f-d033-4702-8d6b-07d17104ea2a)

  - DHCP Server: Allowed
  - DNS Server TCP/UDP: Allowed
  - Web Server HTTP/HTTPS: Allowed
  - LDAP: Allowed
  - Global Catalog: Allowed

---

## Connectivity Tests

- **Ping Tests**: 
  - Successful ping tests were conducted between clients and the server, confirming network connectivity.
    - **Client 1 (pc1)** to **Server**: Successful
    
  ![image](https://github.com/user-attachments/assets/37e16010-6c05-4a89-a7d5-1843177cdd93)

    - **Client 2 (pc2)** to **Server**: Successful
		
  ![image](https://github.com/user-attachments/assets/4444a77b-fe94-4b10-b4c3-fe04ddd68308)

- **NSLookup**: 
  - Successful DNS resolution for the following domains:
    - **ai.exam**: Resolved to `192.168.1.100`
    - **www.ai.exam**: Resolved to `192.168.1.100`

![image](https://github.com/user-attachments/assets/c1e47094-99be-4db3-b444-99ba8eb5c2c7)

- **Web Access**: 
  - Successful access to the website **ai.exam** via:
    - **HTTP**: Accessed at `http://ai.exam`
    - **HTTPS**: Accessed at `https://ai.exam`

      ![image](https://github.com/user-attachments/assets/e64671b8-72ab-40d9-9cba-3443d9f79eab)
      
    - **www.ai.exam via:
      - **HTTP**: Accessed at `http://www.ai.exam`
      - **HTTPS**: Accessed at `https://www.ai.exam`

        ![image](https://github.com/user-attachments/assets/87e350e7-3e9d-4daf-a42e-2126c62fd2e4)
         
---
## Local Account Passwords

| Machine        | Username       | Password      |
|----------------|----------------|---------------|
| Server 2022    | ADMINISTRATOR  | rish@bh123    |
| pc1            | Dev Soni       | ex@m@Dev1     |
| pc2            | Max            | ex@m@Max1     |

---
## ADDS Usernames and Passwords

| OU   | Username | Password      |
|------|----------|---------------|
| IT   | it1      | rish@bh123    |
| IT   | it2      | rish@bh123    |
| Sales| sales1   | rish@bh123    |
| Sales| sales2   | rish@bh123    |

---
## Conclusion
- All configurations successfully implemented and tested.
- DHCP server is operational.
- DNS resolution is functioning correctly.
- IIS web hosting is active.
- Connectivity tests confirmed all systems are functioning as intended.
- Group Policy Objects deployed to enhance security and optimize efficiency in the "Sales" department.
