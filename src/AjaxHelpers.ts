
module Ivane.Network.Ajax
{
	export enum REQUEST_TYPES
	{
		GET,
		POST
	}
	
	export enum DATA_TYPES
	{
		SCRIPT,
		JSON,
		XML,
		HTML,
		TEXT
	}
	
	
	function getStringForREQUEST_TYPES(requestType:REQUEST_TYPES):string
	{
		switch(requestType)
		{
			case REQUEST_TYPES.GET:
			return "GET"
			break
			
			case REQUEST_TYPES.POST:
			return "POST"
			break
		}
	}
	
	enum AJAX_READY_STATES
	{
		REQUEST_NOT_INITIALIZED = 0,
		SERVER_CONNECTION_ESTABLISHED = 1,
		REQUEST_RECEIVED = 2,
		PROCESSING_REQUEST = 3,
		REQUEST_FINISHED_AND_RESPOSNE_IS_READY = 4
	}
	
	enum AJAX_REQUEST_STATUS_CODES
	{
		OK = 200,
		PAGE_NOT_FOUND = 404
	}
	
	export interface AJAXRequestSuccessDelegate
	{
		(responseData:string):void
	}
	
	export interface AJAXReuqestFailDelegate
	{
		():void
	}
	
	export function createAJAXRequest(
		url:string,
		requestType:REQUEST_TYPES,
		data_nullable:(Object|String),
		onSuccess:AJAXRequestSuccessDelegate,
		onFail:AJAXReuqestFailDelegate
		):XMLHttpRequest
	{
		var ajaxRequest = new XMLHttpRequest()
		
		var requestTypeString = getStringForREQUEST_TYPES(requestType)
		var queryString = url
		var urlEncodedParameters:String = ""
		
		if(data_nullable != null)
		{
			if(data_nullable instanceof Object)
			{
				var data_keys = Object.keys(data_nullable)
				
				for 
				(
					var data_key_index = 0;
					data_key_index < data_keys.length;
					data_key_index++ 
				) 
				{
					var data_key = data_keys[data_key_index]
					
					urlEncodedParameters = data_key
											+ "="
											+ data_nullable[data_key]
											+ "&"
				}
				
			}
			else if(data_nullable instanceof String)
			{
				urlEncodedParameters = data_nullable
			}
			
			if
			(
				urlEncodedParameters.charAt(0) != "?"
				&& url.charAt(-1) != "?"
			)
			{
				urlEncodedParameters = "?" + urlEncodedParameters
			}
		}
		
		if(requestType == REQUEST_TYPES.GET)
		{
			ajaxRequest.open
			(
				getStringForREQUEST_TYPES(requestType),
				url+urlEncodedParameters,false
			)
			
			ajaxRequest.send()
		}
		else if(requestType == REQUEST_TYPES.POST)
		{
			throw new Ivane.Exceptions.NotImplemetedException()	
		}
		
		ajaxRequest.onreadystatechange = (ev:ProgressEvent) => {
				console.log("ajax state: ")
				console.log(ev)
				
				console.log("state name: ")
				console.log(ajaxRequest.status)
		}
		
		
		return null
	}
	
}