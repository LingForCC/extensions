import { useState } from 'react';

import {
  Action,
  ActionPanel,
  AI,
  List,
} from '@raycast/api';

import {
  executeJxa,
  parseDate,
  parseTime,
} from './utils';

export default function Command() {

  const [searchText, setSearchText] = useState("");
  const [AIresponse, setAIresponse] = useState("");

  //determine if the response will use isAvailable function

  //invoke isAvailable()

  //show the result based on the return value

  return (
    <List
      filtering={false}
      searchText={searchText}
      onSearchTextChange={setSearchText}
      throttle={true}
      >
        
        <List.Item
          title= ""

          actions={
            <ActionPanel title="">
              <Action title="Assist" onAction={async () => {
                setAIresponse(await askAI(searchText));  
                setSearchText("");          
              }}></Action>
            </ActionPanel>
          }
        />
        <List.Section title='items'>
          <List.Item title="Camden Hells\nTTTT" />
        </List.Section>
      </List>
  );
}

async function askAI(userInput: string) {
  const prompt = `
  
  You are an expert in managing my calendar. You have following tool to use.

  - isAvailable(date, startTime, endTime, timespan): check if available at the specified date between startTime and endTime with specified timespan. If question contains Today, Tomorrow, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday and Sunday, return date as one of them. Otherwise date should be a specific date. startTime is optional. If endTime can NOT be inferred from the question, return an empty string for time. endTime is optional. If endTime can NOT be inferred from the question, return an empty string for time. timespan is optional. If timespan can not be inferred from the question, return and empty string for timespan. timespan should include the unit from the question.
  
  
  Pls tell me what tool and corresponding parameter to use when I ask your questions. ONLY use the tools provided above. DO NOT give me any other instructions. Pls response in JSON format as below

  {
    tool: "toolName" //name of the tool
    parameters: {
      {parameterName}: {parameterValue} //name of the first parameter and corresponding value
    }
  }
  
  Here is my question:

  ${userInput}

  `;

  const response = await AI.ask(prompt, {
    model: "gpt-3.5-turbo"
  });
  
  try {
    const action = JSON.parse(response);
    //TODO: check if the response has all the fields that are needed
    switch(action.tool) {
      case "isAvailable": {
        console.log("Find the tool named isAvailable");
		console.log(action.parameters);
        const {
          date,
          startTime,
          endTime,
          timespan
        } = action.parameters;
        await isAvailable(date, startTime, endTime, timespan)
        break;
      }
      default:
        //TODO: need to notify user in this case
        console.log("no tool can be used based on user input")
        break;
    }
  } catch {
	console.log(response);
	console.log("AI response json parsing error");
    //TODO: if there is a parsing error, it needs to notify an error to the user and ask the user to re-generate
  }

  return response;
}

async function isAvailable(dateString: string, startTimeString: string, endTimeString: string, timespanString: string) {
  if (dateString && startTimeString && !endTimeString && !timespanString) {
	//user is asking for a specific date and time
    const date = new Date();
    parseDate(date, dateString);
    parseTime(date, startTimeString);
    console.log(date.toLocaleString());

	const time = date.getTime();

	const script = `
		var calendarApp = Application("Calendar")
		let cal = calendarApp.calendars.byName("Personal")
		
		return {
			result: cal.events().length
		}
	`;

	await executeJxa(script);
  }
}

