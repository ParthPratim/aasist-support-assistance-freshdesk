
var client;
var lTD;
$(document).ready( function() {
    app.initialized()
        .then(function(_client) {
			AAssistInit();
          client = _client;
client.events.on('app.activated',
            function() {

	  client.data.get("ticket").then (
    function(data) {
	console.log(data);
data = data.ticket;
lTD= data;
	if(data.stats.resolved_at == null || data.stats.closed_at == null)
	{
		respond ="Its your time to resolve this ticket. Happy Supporting!";
		lucy_chat(respond);AAssist_Voice(respond);

	}
	else
	{
			closed_at = data.stats.closed_at;
		if(closed_at != null)
		{

		var diff = daysDiff(parseDate(GetDate(new Date(closed_at))), parseDate(GetDate(new Date())));
			respond="This ticket has been closed "+diff+" days back .";
			lucy_chat(respond);AAssist_Voice(respond);
		}
	}
    },
    function(error) {
		console.log(error);
    }
    );
}
);

    });
});

var msgform = document.getElementById("chat-form");
var conversations = document.getElementById("conversations");
var aib_speech = document.getElementById("aib-speech");
function AAssistMe(form_obj)
{
SpeechStop();
var query = form_obj.chat_text.value;
form_obj.chat_text.value = "";
agent_chat(query);
$.ajax({
        url: 'https://api.dialogflow.com/v1/query?v=20170712&query='+query+'&lang=en&sessionId=1ad06e62-b084-4373-8c50-6a787592a7c4&timezone=Asia/Calcutta',
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer 8c6a5cf59d824dedb69bdc110ee8873d");
        }, success: function(bot_response){
		
	    action = bot_response.result.action;
	    if(strcmp(action,"ticket.check.attachment") == 0)
	    {
	      if(lTD.attachments.length == 0)
	      {
		respond="No, this ticket does not have any attachments.";
		lucy_chat(respond);
		AAssist_Voice(respond);
	      }
	      else
	      {
		respond="Yes, this ticket has " + lTD.attachments.length + " attachments.";
		lucy_chat(respond);
		AAssist_Voice(respond);
	      }
	    }
	    else if(strcmp(action,"ticket.get.pending_since") == 0)
	    {
	      pending_since = lTD.stats.pending_since;
	      if(pending_since == null)
	      {
	      respond = "This ticket is not pending";
	      }
	      else
	      {
	      respond = "This ticket has been pending since "+ pending_since;
	      }
	      lucy_chat(respond);
	      AAssist_Voice(respond);
	    }
	    else if(strcmp(action,"ticket.get.createddate") ==0)
	    {
	    created_d = lTD.created_at;
	    respond = "This ticket was created at "+ new Date(created_d).toString() +".";
	    lucy_chat(respond);
	    AAssist_Voice(respond);
	    }
	    else if(strcmp(action,"ticket.get.priority") == 0)
	    {
	    priority_val  = lTD.priority;
	    priority="";
	    switch(priority_val)
	    {
	    case 1:
	    priority = "Low";
	    break;
	    case 2:
	    priority = "Medium";
	    break;
	    case 3:
	    priority = "High";
	    break;
	    case 4:
	    priority = "Urgent";
	    break;
	    }
	    respond = "This ticket is of a "+priority+" priority.";
	    lucy_chat(respond);
	    AAssist_Voice(respond);
	    }
	    else if(strcmp(action,"ticket.check.spam")==0)
	    {
	    spam = lTD.spam;
	    if(spam == true)
		{
	    respond = "This ticket was detected as a spam.";
		}
	    else
		{
	    respond = "This ticket is a genuine one.";
		}
	    lucy_chat(respond);
	    AAssist_Voice(respond);
	    }
	    else if(strcmp(action,"ticket.get.tags")==0)
	    {
	    tags = lTD.tags;
	    len_t = tags.length;
	    if(len_t == 0)
		{
	    respond = "This ticket conatins no tags.";
		}
	    else
	    {
	    respond = "This ticket is tagged under ";
	    for(i = 0; i < len_t;i++)
		{
	    respond += tags[i] + ", ";
		}
	    respond += ".";
	    }
	    lucy_chat(respond);
	    AAssist_Voice(respond);
	    }
	    else if(strcmp(action,"ticket.get.status")==0)
	    {
	    status_t = parseInt(lTD.status);
	    status_text= "";
	    switch(status_t)
	    {
	    case 2:
	    status_text = "open";
	    break;
	    case 3:
	    status_text = "pending";
	    break;
	    case 4:
	    status_text = "resolved";
	    break;
	    case 5:
	    status_text = "closed";
	    break;
	    case 6:
	    status_text = "waiting on customers";
	    break;
	    case 7:
	    status_text = "waiting on third party";
	    break;
	    }
	    respond = "This ticket is " + status_text;
	    lucy_chat(respond);
	    AAssist_Voice(respond);
	    }
	    else if(strcmp(action,"ticket.get.first_responded_at") ==0)
	    {
	    fra = lTD.stats.first_responded_at;
	    if(fra == null)
		{
	    respond = "Looks like noone has responded yet. Go on and resolve it. Good Luck";
		}
	    else 
		{
	    respond = "This ticket was first responded at "+ new Date(fra).toString() +".";
		}
	    lucy_chat(respond);
	    AAssist_Voice(respond);
	    }
	    else if(strcmp(action,"ticket.get.closed_at") ==0)
	    {	    
	    ca = lTD.stats.closed_at;
	    if(ca == null)
		{
	    respond = "This ticket is not yet closed";
		}
	    else
		{
	    respond = "This ticket was closed at "+ new Date(ca).toString() +".";
		}
	    lucy_chat(respond);
	    AAssist_Voice(respond);
	    }
	    else if(strcmp(action,"ticket.get.agent_responded_at") ==0)
	    {
	    ara = lTD.stats.agent_responded_at;
	    if(ara == null)
		{
	    respond = "Looks like noone has responded yet. Go on and resolve it. Good Luck";
		}
	    else
		{
	    respond = "This ticket was responded by the agent at "+ new Date(ara).toString() +".";
		}
	    lucy_chat(respond);
	    AAssist_Voice(respond);
	    }
	    else if(strcmp(action,"ticket.get.resolved_at") ==0)
	    {
	    ra = lTD.stats.resolved_at;
	    if(ra == null)
		{
	    respond = "This ticket has not yet been resolved.Help resolve this ticket.";
		}
	    else
		{
	    respond = "This ticket was resolved at "+ new Date(ra).toString() + ".";
		}
	    lucy_chat(respond);
	    AAssist_Voice(respond);
	    }
	    else if(strcmp(action,"ticket.get.reopened_at") ==0)
	    {
	    roa = lTD.stats.reopened_at;
	    if(roa == null)
		{
	    respond = "This ticket was not reopened.";
		}
	    else
		{
	    respond = "This ticket was reopened at "+ new Date(roa).toString() +".";
		}
	    lucy_chat(respond);
	    AAssist_Voice(respond);
	    }
	    else if(strcmp(action,"ticket.get.ratings") ==0)
	    {
	    rat = lTD.survey_result.rating;
	    if(!rat)
		{
	    respond = "This ticket was not rated.";
		}
	    else
		{
	    respond = "This ticket was rated at "+ rat.default_question +".";
		}
	    lucy_chat(respond);
	    AAssist_Voice(respond);
	    }
	    
	    else
	    {
            response = bot_response.result.fulfillment.speech;
		lucy_chat(response);
	    AAssist_Voice(response);
	   }
        }
});

return false;
}
var recognition;

function AAssistInit()
{

	recognition = new (webkitSpeechRecognition || SpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
[
		 'onaudiostart',
		 'onaudioend',
		 'onend',
		 'onerror',
		 'onnomatch',
		 'onresult',
		 'onsoundstart',
		 'onsoundend',
		 'onspeechend',
		 'onstart'
		].forEach(function(eventName) {
			recognition[eventName] = function(e) {
			console.log(eventName, e);
			};
		});


recognition.onresult = function(event) {
		SpeechStop();
		var voice_input = event.results[0][0].transcript;
		console.log(voice_input);
	    msgform.chat_text.value = voice_input;
	    AAssistMe(msgform);
};

recognition.onend = function(event){
	console.log(event);
	SpeechStart();
};

recognition.onaudioend = function(event){
	console.log(event);
	aib_speech.innerHTML = "Recognizing";
};
}
function SpeechStart()
{
	recognition.start();
	aib_speech.innerHTML = "Speak Now";
}
function SpeechStop()
{
	recognition.stop();
	aib_speech.innerHTML = "Please Wait";
}
function lucy_chat(response)
{
            var lpa_chat = document.createElement("div");
	    lpa_chat.className = "pa-chat chat-lucy";
	    var lucy_chat = document.createElement("div");
	    lucy_chat.className = "lucy-chat";
	    lucy_chat.innerHTML = response;
	    lpa_chat.appendChild(lucy_chat);
	    conversations.appendChild(lpa_chat);
	    $('#conversations').scrollTop($('#conversations')[0].scrollHeight);
}
function agent_chat(response)
{
	var pa_chat = document.createElement("div");
	pa_chat.className = "pa-chat chat-agent";
	var agent_chat = document.createElement("div");
	agent_chat.className = "agent-chat";
	agent_chat.innerHTML = response;
	pa_chat.appendChild(agent_chat);
	conversations.appendChild(pa_chat);
	$('#conversations').scrollTop($('#conversations')[0].scrollHeight);
}
function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function daysDiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}
function GetDate(ct)
{
//var today = new Date();
var dd = ct.getDate();
var mm = ct.getMonth()+1; //January is 0!
var yyyy = ct.getFullYear();
if(dd<10) {
    dd = '0'+dd;
} 
if(mm<10) {
    mm = '0'+mm;
} 
ct = mm + '/' + dd + '/' + yyyy;
return ct;
}
function AAssist_Voice(words)
{
SpeechStop();
	responsiveVoice.speak(words,"Australian Female" , {
			onstart: function(){
				SpeechStop();
			},
	    	onend : function(){
	    		SpeechStart();
	    	}
	    });
}
function strcmp(str1,str2)
{
return str1.localeCompare(str2);
}