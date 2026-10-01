const CLIENT_ID="68654a51-90fc-4126-b19f-c3b9c59fa9ea";
const REDIRECT_URI="https://seanriggs.github.io/sickle-scythe-business-tracker/";
const SCOPES=["User.Read","Files.ReadWrite.AppFolder"];
const GRAPH="https://graph.microsoft.com/v1.0";
const FILE="business-data.json";
const config={auth:{clientId:CLIENT_ID,authority:"https://login.microsoftonline.com/common",redirectUri:REDIRECT_URI,postLogoutRedirectUri:REDIRECT_URI},cache:{cacheLocation:"localStorage"}};
const client=new msal.PublicClientApplication(config);
const status=document.querySelector('#status'), message=document.querySelector('#message'), preview=document.querySelector('#preview');
let account=null;
function show(m){message.textContent=m} function state(){status.textContent=account?`Signed in: ${account.username}`:"Not signed in"}
async function init(){await client.initialize();const result=await client.handleRedirectPromise();account=result?.account||client.getAllAccounts()[0]||null;if(account)client.setActiveAccount(account);state()}
async function login(){const r=await client.loginPopup({scopes:SCOPES,prompt:"select_account"});account=r.account;client.setActiveAccount(account);state();show("Microsoft sign-in succeeded. You can now test OneDrive load/save.")}
async function token(){if(!account)throw new Error("Sign in first.");try{return (await client.acquireTokenSilent({scopes:SCOPES,account})).accessToken}catch{return (await client.acquireTokenPopup({scopes:SCOPES,account})).accessToken}}
async function graph(path,opts={}){const t=await token();const r=await fetch(GRAPH+path,{...opts,headers:{Authorization:`Bearer ${t}`,...(opts.headers||{})}});if(!r.ok){const txt=await r.text();throw new Error(`${r.status}: ${txt}`)}return r}
async function load(){try{show("Loading business-data.json from OneDrive...");const r=await graph(`/me/drive/special/approot:/${FILE}:/content`);const data=await r.json();preview.textContent=JSON.stringify(data,null,2);localStorage.setItem("sickle-scythe-cloud-cache",JSON.stringify(data));show("Cloud database loaded successfully.")}catch(e){if(String(e).includes("404")){show("No cloud database exists yet. Use Save test database to create it.")}else show("Load failed: "+e.message)}}
async function save(){try{const cached=localStorage.getItem("sickle-scythe-tracker-v3");const data=cached?JSON.parse(cached):{schemaVersion:1,createdAt:new Date().toISOString(),orders:[],sales:[],payments:[],expenses:[],claims:[],adjustments:[],history:[]};data.cloudUpdatedAt=new Date().toISOString();show("Saving database to the private OneDrive App Folder...");await graph(`/me/drive/special/approot:/${FILE}:/content`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(data,null,2)});preview.textContent=JSON.stringify(data,null,2);show("Cloud database saved successfully.")}catch(e){show("Save failed: "+e.message)}}
async function logout(){await client.logoutPopup({account});account=null;state();show("Signed out.")}
document.querySelector('#signin').onclick=()=>login().catch(e=>show("Sign-in failed: "+e.message));document.querySelector('#load').onclick=load;document.querySelector('#save').onclick=save;document.querySelector('#signout').onclick=logout;init().catch(e=>show("Initialization failed: "+e.message));