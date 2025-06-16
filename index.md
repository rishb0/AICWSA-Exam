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
1. [Question](#question)
2. [Machine Details](#machine-details)
   - [Server](#server)
   - [Client 1](#client-1)
   - [Client 2](#client-2)
3. [DHCP Configuration](#dhcp-configuration)
4. [DNS Configuration](#dns-configuration)
5. [IIS Web Hosting](#iis-web-hosting)
6. [Top Group Policies on the Sales OU](#top-group-policies-on-the-sales-ou)
7. [Firewall Configuration](#firewall-configuration)
8. [Connectivity Tests](#connectivity-tests)
9. [Local Account Passwords](#local-account-passwords)
10. [ADDS Usernames and Passwords](#adds-usernames-and-passwords)
11. [Conclusion](#conclusion)

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

![image](https://github.com/user-attachments/assets/94cb9395-68f1-47bc-8654-1573accd5d3b)



### Client 1
- **Operating System**: Windows 11
- **Local Admin**: Dev Soni
- **Password**: ex@m@Dev1
- **Hostname**: pc1

![image](https://github.com/user-attachments/assets/1a842815-2342-4f72-b360-4d809717903e)


### Client 2
- **Operating System**: Windows 11
- **Local Admin**: Max Soni
- **Password**: ex@m@Max1
- **Hostname**: pc2

![image](https://github.com/user-attachments/assets/fb437b33-bcda-492b-9ac6-47ba8d7ea916)
  
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

![image](https://github.com/user-attachments/assets/f430542f-f578-41aa-abb3-42ce4071c0b0)

- **Automatic DNS Updates**: Configured to automatically update DNS records for DHCP clients.

![image](https://github.com/user-attachments/assets/205212b4-0428-4cd0-a3a6-f3053aaaf193)

---

## DNS Configuration
- **Forward Lookup Zone**: ai.exam
- **Records**: 
  - **Host (A) Records**:
    - ai.exam: 192.168.1.100
    - server1: 192.168.1.100
  - **CNAME Record**: 
    - www → ai.exam
    
![image](https://github.com/user-attachments/assets/481f0d6c-32e8-4c4b-bea6-5d8ecef195e1)

---

## IIS Web Hosting
- **Roles Added**: 
  - Web Server (IIS)

![image](https://github.com/user-attachments/assets/fe2f023d-3737-437c-a7c2-1988859949a8)

![image](https://github.com/user-attachments/assets/f45e0f01-3197-47d8-aabc-b02e5b9f49cc)

- **Website Name**: ai.exam
- **Physical Path**: C:\inetpub\ai.exam

![image](https://github.com/user-attachments/assets/e40f6410-5af4-4443-8834-fcffdeeaad32)

- **Bindings**: 
  - HTTP: Port 80
  - HTTPS: Port 443

![image](https://github.com/user-attachments/assets/5b866af9-124d-4eda-bf21-452bf013dffc)

- **HTTP Redirection**: Redirects all HTTP requests to HTTPS.

![image](https://github.com/user-attachments/assets/8a1f895c-de46-45fa-a66f-bc1006908716)

![image](https://github.com/user-attachments/assets/c96b2f0a-e93e-4d31-b33b-cc216c2c9963)

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

![image](https://github.com/user-attachments/assets/6085bf22-6d9f-455b-83db-9d6e364c5302)

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
    
![image](https://github.com/user-attachments/assets/ef4d03a5-e833-4031-bc28-f2a77fc44e19)

    - **Client 2 (pc2)** to **Server**: Successful
		
![image](https://github.com/user-attachments/assets/04d80104-3c7f-4b83-99cf-509a5ad367ae)

- **NSLookup**: 
  - Successful DNS resolution for the following domains:
    - **ai.exam**: Resolved to `192.168.1.100`
    - **www.ai.exam**: Resolved to `192.168.1.100`

![image](https://github.com/user-attachments/assets/86dc87bd-63f0-4bd2-8026-b698dab89531)

- **Web Access**: 
  - Successful access to the website **ai.exam** via:
    - **HTTP**: Accessed at `http://ai.exam`
    - **HTTPS**: Accessed at `https://ai.exam`

![image](https://github.com/user-attachments/assets/11ff1821-d47e-4550-8a93-4cfb8779456f)
      
    - **www.ai.exam via:
      - **HTTP**: Accessed at `http://www.ai.exam`
      - **HTTPS**: Accessed at `https://www.ai.exam`

![image](https://github.com/user-attachments/assets/2f7dd071-077e-4e84-b071-bb8df19e5b51)
         
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
