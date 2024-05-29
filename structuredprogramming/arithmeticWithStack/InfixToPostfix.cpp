#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<string> strToInfix(string& inputString) {
    vector<string> expression;
    string num = "";
    int n = inputString.length();

    for (int i = 0; i < n; ++i) {
        char current = inputString[i];
        
        if (isdigit(current) || (current == '-' && (i == 0 || inputString[i - 1] == '('))) {
            num += current;
            while (i + 1 < n && isdigit(inputString[i + 1])) {
                num += inputString[++i];
            }
            expression.push_back(num);
            num = "";
        } else if (current == '+' || current == '-' || current == '*' ||
                   current == '/' || current == '%' || current == '(' || current == ')') {
            expression.push_back(string(1, current));
        }
    }
    return expression;
}

vector<string> handleNegative(vector<string>& expression) {
    vector<string> result;
    int n = expression.size();

    for (int i = 0; i < n; ++i) {
        if (expression[i] == "-" && (i == 0 || expression[i - 1] == "(" || 
                                     expression[i - 1] == "+" || expression[i - 1] == "-" || 
                                     expression[i - 1] == "*" || expression[i - 1] == "/" || 
                                     expression[i - 1] == "%")) {
            result.push_back("-1");
            result.push_back("*");
        } else {
            result.push_back(expression[i]);
        }
    }

    return result;
}
int priority (string opr){
    if (opr == "+" || opr == "-") return 1;
    if (opr == "*" || opr == "/") return 2;
    return 0;
}

//infix to postfix
vector<string> infixToPostfix(vector<string>& infix){
    vector<string> postfix;
    stack<string> oprStack;
    
    for(auto& token :  infix){
        if ((token[0] >= '0' && token[0] <= '9') || (token[0] == '-' && token.length() > 1)){
            postfix.push_back(token);
        }else if (token == "("){
            oprStack.push(token);
        } else if (token == ")"){
            while(!oprStack.empty() && oprStack.top() != "("){
                postfix.push_back(oprStack.top());
                oprStack.pop();
        }
        oprStack.push(token);
    }
}
while(!oprStack.empty()){
    postfix.push_back(oprStack.top());
    oprStack.pop();
}
return postfix;
}
