// Edited by CAj for line-by-line verification test
// js/app.js — Full Google One-Tap + Persistent Button + Status Circle
import
 {
 getAuth, 
onAuthStateChanged, 
signOut, 
GoogleAuthProvider, 
signInWithCredential
 }
 from
 "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"
;
// Firebase Auth instance (initialized inline in index.html)
const
 auth
 = 
getAuth
(
)
;
// When the page loads, initialize Google ID Services and render the sign-in button
alert
(
"call addeventlistner"
 + 
e
.
message
)
;
window
.
addEventListener
(
'load'
, 
(
)
 => 
{
  
// Initialize Google One-Tap & Button
  
google
.
accounts
.
id
.
initialize
(
{
    
client_id
: 
"93996985456-ffj2euk9i4q41v88njuhpusk73mdb31j.apps.googleusercontent.com"
,
    
callback
: 
handleCredentialResponse
,
    
auto_select
: 
false
,
    
cancel_on_tap_outside
: 
false
  
}
)
;
  
// Render persistent button
  
google
.
accounts
.
id
.
renderButton
(
    
document
.
querySelector
(
".g_id_signin"
)
,
    
{
 type
: 
"standard"
, 
size
: 
"large"
, 
theme
: 
"outline"
, 
text
: 
"signin_with"
, 
shape
: 
"rectangular"
 }
  
)
;
  
// Show One-Tap prompt as well
  
google
.
accounts
.
id
.
prompt
(
)
;
}
)
;
// Handle Google credential and sign into Firebase
window
.
handleCredentialResponse
 = 
async
 
(
response
)
 => 
{
  
try
 {
    
const
 credential
 = 
GoogleAuthProvider
.
credential
(
response
.
credential
)
;
    
await
 signInWithCredential
(
auth
, 
credential
)
;
  
}
 catch
 (
e
)
 {
    
console
.
error
(
"Sign-in failed:"
, 
e
)
;
    
alert
(
"Sign-in failed: "
 + 
e
.
message
)
;
  
}
}
;
