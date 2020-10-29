import re
import json

question_list = []

def Question_Filled(question):
    if not question["Number"]: 
        return False
    if not question["Question"]: 
        return False
    if not question["A"]: 
        return False
    if not question["B"]: 
        return False
    if not question["C"]: 
        return False
    if not question["D"]: 
        return False
    return True

def Blank_Question():
    question = {
        "Number": 1,
        "Question" : "",
        "A" : "",
        "B" : "",
        "C" : "",
        "D" : "",
        "Answer": ""
    }
    return question

def Add_Question(question):
    question_list.append(question)

def main():
    question_number = 1
    question_pattern = r"Question\s[\d]+\:\s([\S\s]+\?)"
    answer_pattern = r"([\w]+)\.\s+([\S\s]+)\."

    question = Blank_Question()

    with open(r"c:/Code/GTBootCampMain/04-Web-APIs/02-Homework/Assets/Questions.txt", encoding="utf8") as questions:
        while True:
            line = questions.readline()
            if not line:
                break
            if line.rstrip():
                match = re.search(question_pattern, line)
                if match:
                    question["Number"] = question_number
                    question_number += 1
                    question["Question"] = match.group(1)

                match = re.search(answer_pattern, line)    
                if match:
                    question[match.group(1)]  = match.group(2)

                if Question_Filled(question):
                    Add_Question(question)
                    question = Blank_Question()
    
    question_number = 0
    with open(r"c:/Code/GTBootCampMain/04-Web-APIs/02-Homework/Assets/Answers.txt", encoding="utf8") as answers:
        while True:
            line = answers.readline()
            if not line:
                break
            if line.rstrip():
                match = re.search(answer_pattern, line)
                if match:
                    question_list[question_number]["Answer"] = match.group(1)
                    question_number += 1
    
    f = open(r"c:/Code/GTBootCampMain/04-Web-APIs/02-Homework/Assets/Questions.json", "w")
    f.write(json.dumps(question_list))
    f.close()


if(__name__) == "__main__":
    main()