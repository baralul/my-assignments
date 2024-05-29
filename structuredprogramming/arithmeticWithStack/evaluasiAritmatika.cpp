int evaluatePostfix(const vector<string>& postfix) {
    stack<int> evalStack;

    for (const string& token : postfix) {
        if (isOperator(token)) {
            int b = evalStack.top();
            evalStack.pop();
            int a = evalStack.top();
            evalStack.pop();

            if (token == "+") evalStack.push(a + b);
            else if (token == "-") evalStack.push(a - b);
            else if (token == "*") evalStack.push(a * b);
            else if (token == "/") evalStack.push(a / b);
            else if (token == "%") evalStack.push(a % b);
        } else {
            evalStack.push(stoi(token));
        }
    }

    return evalStack.top();
}
