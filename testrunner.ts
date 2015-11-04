/// <reference path="Scripts/typings/node/node.d.ts" />

import {readFileSync} from "fs";
import * as ts from "typescript";

export function visit(node: ts.Node): ts.Node {
    let children = node.getChildren();
    var newChildren: ts.Node[];
    for (var i = 0; i < children.length; i++) {
        let currentChild = children[i];
        let visitedChild = visit(currentChild);

        newChildren[i] = visitedChild;

    }
    //Rewrite node;
    var newNode = node;
    //Rewrite node;

    for (var i = 0; i < newChildren.length; i++) {
        let currentChild = newChildren[i];
        currentChild.parent = newNode;
    }

    return newNode;
}

function compile(fileName: string, options: ts.CompilerOptions): void {
    let sourceFile = ts.createSourceFile("TypescriptSyntaxRewriterTest.ts", readFileSync(fileName).toString(), ts.ScriptTarget.ES6, /*setParentNodes */ true);
    let root: ts.SourceFile = sourceFile;
    printAST(root, 0);
}

// printAST
function printAST(node: ts.Node, n: number): void {
    var tabs = "";
    for (var i = 0; i < n; i++)
        tabs += "   ";
    console.log(tabs + (<any>ts).SyntaxKind[node.kind.toString()] + ": " + node.getText());
    //node.kind == ts.SyntaxKind.NumericLiteral;
    var children = node.getChildren();
    for (var child = 0; child < node.getChildCount(); child++) {
        printAST(children[child], n + 1);
    }
}

compile(process.argv.slice(2)[0], {
    noEmitOnError: true, noImplicitAny: true,
    target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
});

var node = ts.createNode(ts.SyntaxKind.EmptyStatement);
node.pos = 0;
node.end = 4;
console.log(node.kind);
console.log(node.getEnd());