/// <reference path="Scripts/typings/node/node.d.ts" />

import * as ts from "typescript";

export class Factory {
    static childAdded(parent: ts.Node, child: ts.Node): void {
        if (child && !child.parent) {
            child.parent = parent;
        }
    }

    static beginNode<TNode extends ts.Node>(kind: ts.SyntaxKind): TNode {
        var ctor = ts.getNodeConstructor(kind);
        var node = <TNode>(new ctor());
        return node;
    }

    static finishNode<TNode extends ts.Node>(node: TNode, location?: ts.TextRange, flags?: ts.NodeFlags, modifiers?: ts.Node[]): TNode {
        if (location) {
            node.pos = location.pos;
            node.end = location.end;
        }
        else {
            node.pos = -1;
            node.end = -1;
        }

        if (flags) {
            node.flags = flags;
        }

        if (modifiers) {
            node.modifiers = <ts.ModifiersArray>modifiers;
            node.flags |= node.modifiers.flags;
        }

        ts.forEachChild(node, child => this.childAdded(node, child));
        return node;
    }

    // statements
    getExpressionForEntityName(name: ts.EntityName): ts.LeftHandSideExpression {
        if (!name) {
            return Factory.finishNode(Factory.beginNode<ts.LeftHandSideExpression>(ts.SyntaxKind.NullKeyword));
        }

        if (name.kind === ts.SyntaxKind.Identifier) {
            return Factory.createIdentifier((<ts.Identifier>name).text);
        }
        else {
            return Factory.createPropertyAccessExpression(this.getExpressionForEntityName((<ts.QualifiedName>name).left), Factory.createIdentifier((<ts.QualifiedName>name).right.text));
        }
    }

    static createTokenNode(token: ts.SyntaxKind, location?: ts.TextRange, flags?: ts.NodeFlags): ts.Node {
        return Factory.finishNode(Factory.beginNode(token), location, flags);
    }

    static createStringLiteral(text: string, location?: ts.TextRange, flags?: ts.NodeFlags): ts.StringLiteral {
        var node = Factory.beginNode<ts.StringLiteral>(ts.SyntaxKind.StringLiteral);
        node.text = text;
        return Factory.finishNode(node, location, flags);
    }

    static createNumericLiteral(value: number | string, location?: ts.TextRange, flags?: ts.NodeFlags): ts.LiteralExpression {
        var node = Factory.beginNode<ts.LiteralExpression>(ts.SyntaxKind.NumericLiteral);
        node.text = String(value);
        return Factory.finishNode(node, location, flags);
    }

    static createIdentifier(text: string, location?: ts.TextRange, flags?: ts.NodeFlags): ts.Identifier {
        var node = Factory.beginNode<ts.Identifier>(ts.SyntaxKind.Identifier);
        node.text = text;
        return Factory.finishNode(node, location, flags);
    }

    static createQualifiedName(left: ts.EntityName, right: ts.Identifier, location?: ts.TextRange, flags?: ts.NodeFlags): ts.QualifiedName {
        var node = Factory.beginNode<ts.QualifiedName>(ts.SyntaxKind.QualifiedName);
        node.left = left;
        node.right = right;
        return Factory.finishNode(node, location, flags);
    }

    static updateQualifiedName(node: ts.QualifiedName, left: ts.EntityName, right: ts.Identifier): ts.QualifiedName {
        if (node.left !== left || node.right !== right) {
            return Factory.createQualifiedName(left, right, node, node.flags);
        }
        return node;
    }

    static createComputedPropertyName(expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ComputedPropertyName {
        var node = Factory.beginNode<ts.ComputedPropertyName>(ts.SyntaxKind.ComputedPropertyName);
        node.expression = expression;
        return Factory.finishNode(node, location, flags);
    }

    static updateComputedPropertyName(node: ts.ComputedPropertyName, expression: ts.Expression): ts.ComputedPropertyName {
        if (node.expression !== expression) {
            return Factory.createComputedPropertyName(expression, node, node.flags);
        }
        return node;
    }

    static createTypeParameter(name: ts.Identifier, constraint?: ts.TypeNode, expression?: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.TypeParameterDeclaration {
        var node = Factory.beginNode<ts.TypeParameterDeclaration>(ts.SyntaxKind.TypeParameter);
        node.name = name;
        node.constraint = constraint;
        node.expression = expression;
        return Factory.finishNode(node, location, flags);
    }

    static updateTypeParameter(node: ts.TypeParameterDeclaration, name: ts.Identifier, constraint: ts.TypeNode): ts.TypeParameterDeclaration {
        if (node.name !== name || node.constraint !== constraint) {
            return Factory.createTypeParameter(name, constraint, node.expression, node, node.flags);
        }
        return node;
    }

    static createParameterDeclaration(name: ts.BindingPattern | ts.Identifier, initializer?: ts.Expression, type?: ts.TypeNode, modifiers?: ts.Node[], dotDotDotToken?: ts.Node, questionToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ParameterDeclaration {
        var node = Factory.beginNode<ts.ParameterDeclaration>(ts.SyntaxKind.Parameter);
        node.name = name;
        node.initializer = initializer;
        node.type = type;
        node.modifiers = <ts.ModifiersArray>modifiers;
        node.dotDotDotToken = dotDotDotToken;
        node.questionToken = questionToken;
        return Factory.finishNode(node, location, flags, modifiers);
    }

    static updateParameterDeclaration(node: ts.ParameterDeclaration, name: ts.BindingPattern | ts.Identifier, initializer: ts.Expression, type: ts.TypeNode): ts.ParameterDeclaration {
        if (node.name !== name || node.initializer !== initializer || node.type !== type) {
            return Factory.createParameterDeclaration(name, initializer, type, node.modifiers, node.dotDotDotToken, node.questionToken, node, node.flags);
        }
        return node;
    }

    static createPropertySignature(name: ts.DeclarationName, type?: ts.TypeNode, questionToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.PropertyDeclaration {
        var node = Factory.beginNode<ts.PropertyDeclaration>(ts.SyntaxKind.PropertySignature);
        node.name = name;
        node.type = type;
        node.questionToken = questionToken;
        return Factory.finishNode(node, location, flags);
    }

    static updatePropertySignature(node: ts.PropertyDeclaration, name: ts.DeclarationName, type: ts.TypeNode): ts.PropertyDeclaration {
        if (node.name !== name || node.type !== type) {
            return Factory.createPropertySignature(name, type, node.questionToken, node, node.flags);
        }
        return node;
    }

    static createPropertyDeclaration(name: ts.DeclarationName, initializer?: ts.Expression, type?: ts.TypeNode, questionToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.PropertyDeclaration {
        var node = Factory.beginNode<ts.PropertyDeclaration>(ts.SyntaxKind.PropertyDeclaration);
        node.name = name;
        node.initializer = initializer;
        node.type = type;
        node.questionToken = questionToken;
        return Factory.finishNode(node, location, flags);
    }

    static updatePropertyDeclaration(node: ts.PropertyDeclaration, name: ts.DeclarationName, initializer: ts.Expression, type: ts.TypeNode): ts.PropertyDeclaration {
        if (node.name !== name || node.initializer !== initializer || node.type !== type) {
            return Factory.createPropertyDeclaration(name, initializer, type, node.questionToken, node, node.flags);
        }
        return node;
    }

    static createMethodSignature(name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], asteriskToken?: ts.Node, questionToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.MethodDeclaration {
        var node = Factory.beginNode<ts.MethodDeclaration>(ts.SyntaxKind.MethodSignature);
        node.name = name;
        node.parameters = Factory.createNodeArray(parameters);
        node.typeParameters = Factory.createNodeArray(typeParameters);
        node.type = type;
        node.modifiers = <ts.ModifiersArray>modifiers;
        node.asteriskToken = asteriskToken;
        node.questionToken = questionToken;
        return Factory.finishNode(node, location, flags, modifiers);
    }

    static updateMethodSignature(node: ts.MethodDeclaration, name: ts.DeclarationName, parameters: ts.ParameterDeclaration[]): ts.MethodDeclaration {
        if (node.name !== name || node.parameters !== parameters) {
            return Factory.createMethodSignature(name, parameters, node.typeParameters, node.type, node.modifiers, node.asteriskToken, node.questionToken, node, node.flags);
        }
        return node;
    }

    static createMethodDeclaration(name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], body: ts.Block, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], asteriskToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.MethodDeclaration {
        var node = Factory.beginNode<ts.MethodDeclaration>(ts.SyntaxKind.MethodDeclaration);
        node.name = name;
        node.parameters = Factory.createNodeArray(parameters);
        node.body = body;
        node.typeParameters = Factory.createNodeArray(typeParameters);
        node.type = type;
        node.modifiers = <ts.ModifiersArray>modifiers;
        node.asteriskToken = asteriskToken;
        return Factory.finishNode(node, location, flags, modifiers);
    }

    static updateMethodDeclaration(node: ts.MethodDeclaration, name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], body: ts.Block): ts.MethodDeclaration {
        if (node.name !== name || node.parameters !== parameters || node.body !== body) {
            return Factory.createMethodDeclaration(name, parameters, body, node.typeParameters, node.type, node.modifiers, node.asteriskToken, node, node.flags);
        }
        return node;
    }

    static createConstructor(parameters: ts.ParameterDeclaration[], body: ts.Block, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.ConstructorDeclaration {
        var node = Factory.beginNode<ts.ConstructorDeclaration>(ts.SyntaxKind.Constructor);
        node.parameters = Factory.createNodeArray(parameters);
        node.body = body;
        node.typeParameters = Factory.createNodeArray(typeParameters);
        node.type = type;
        node.modifiers = <ts.ModifiersArray>modifiers;
        return Factory.finishNode(node, location, flags, modifiers);
    }

    static updateConstructor(node: ts.ConstructorDeclaration, parameters: ts.ParameterDeclaration[], body: ts.Block): ts.ConstructorDeclaration {
        if (node.parameters !== parameters || node.body !== body) {
            return Factory.createConstructor(parameters, body, node.typeParameters, node.type, node.modifiers, node, node.flags);
        }
        return node;
    }

    static createGetAccessor(name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], body: ts.Block, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.AccessorDeclaration {
        var node = Factory.beginNode<ts.AccessorDeclaration>(ts.SyntaxKind.GetAccessor);
        node.name = name;
        node.parameters = Factory.createNodeArray(parameters);
        node.body = body;
        node.typeParameters = Factory.createNodeArray(typeParameters);
        node.type = type;
        node.modifiers = <ts.ModifiersArray>modifiers;
        return Factory.finishNode(node, location, flags, modifiers);
    }

    static updateGetAccessor(node: ts.AccessorDeclaration, name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], body: ts.Block): ts.AccessorDeclaration {
        if (node.name !== name || node.parameters !== parameters || node.body !== body) {
            return Factory.createGetAccessor(name, parameters, body, node.typeParameters, node.type, node.modifiers, node, node.flags);
        }
        return node;
    }

    static createSetAccessor(name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], body: ts.Block, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.AccessorDeclaration {
        var node = Factory.beginNode<ts.AccessorDeclaration>(ts.SyntaxKind.SetAccessor);
        node.name = name;
        node.parameters = Factory.createNodeArray(parameters);
        node.body = body;
        node.typeParameters = Factory.createNodeArray(typeParameters);
        node.type = type;
        node.modifiers = <ts.ModifiersArray>modifiers;
        return Factory.finishNode(node, location, flags, modifiers);
    }

    static updateSetAccessor(node: ts.AccessorDeclaration, name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], body: ts.Block): ts.AccessorDeclaration {
        if (node.name !== name || node.parameters !== parameters || node.body !== body) {
            return Factory.createSetAccessor(name, parameters, body, node.typeParameters, node.type, node.modifiers, node, node.flags);
        }
        return node;
    }

    static createCallSignature(parameters: ts.ParameterDeclaration[], typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.SignatureDeclaration {
        var node = Factory.beginNode<ts.SignatureDeclaration>(ts.SyntaxKind.CallSignature);
        node.parameters = Factory.createNodeArray(parameters);
        node.typeParameters = Factory.createNodeArray(typeParameters);
        node.type = type;
        node.modifiers = <ts.ModifiersArray>modifiers;
        return Factory.finishNode(node, location, flags, modifiers);
    }

    static updateCallSignature(node: ts.SignatureDeclaration, parameters: ts.ParameterDeclaration[]): ts.SignatureDeclaration {
        if (node.parameters !== parameters) {
            return Factory.createCallSignature(parameters, node.typeParameters, node.type, node.modifiers, node, node.flags);
        }
        return node;
    }

    static createConstructSignature(parameters: ts.ParameterDeclaration[], typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.SignatureDeclaration {
        var node = Factory.beginNode<ts.SignatureDeclaration>(ts.SyntaxKind.ConstructSignature);
        node.parameters = Factory.createNodeArray(parameters);
        node.typeParameters = Factory.createNodeArray(typeParameters);
        node.type = type;
        node.modifiers = <ts.ModifiersArray>modifiers;
        return Factory.finishNode(node, location, flags, modifiers);
    }

    static updateConstructSignature(node: ts.SignatureDeclaration, parameters: ts.ParameterDeclaration[]): ts.SignatureDeclaration {
        if (node.parameters !== parameters) {
            return Factory.createConstructSignature(parameters, node.typeParameters, node.type, node.modifiers, node, node.flags);
        }
        return node;
    }

    static createIndexSignature(parameters: ts.ParameterDeclaration[], typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.IndexSignatureDeclaration {
        var node = Factory.beginNode<ts.IndexSignatureDeclaration>(ts.SyntaxKind.IndexSignature);
        node.parameters = Factory.createNodeArray(parameters);
        node.typeParameters = Factory.createNodeArray(typeParameters);
        node.type = type;
        node.modifiers = <ts.ModifiersArray>modifiers;
        return Factory.finishNode(node, location, flags, modifiers);
    }

    static updateIndexSignature(node: ts.IndexSignatureDeclaration, parameters: ts.ParameterDeclaration[]): ts.IndexSignatureDeclaration {
        if (node.parameters !== parameters) {
            return Factory.createIndexSignature(parameters, node.typeParameters, node.type, node.modifiers, node, node.flags);
        }
        return node;
    }

    static createObjectBindingPattern(elements: ts.BindingElement[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.BindingPattern {
        var node = Factory.beginNode<ts.BindingPattern>(ts.SyntaxKind.ObjectBindingPattern);
        node.elements = Factory.createNodeArray(elements);
        return Factory.finishNode(node, location, flags);
    }

    static updateObjectBindingPattern(node: ts.BindingPattern, elements: ts.BindingElement[]): ts.BindingPattern {
        if (node.elements !== elements) {
            return Factory.createObjectBindingPattern(elements, node, node.flags);
        }
        return node;
    }

    static createArrayBindingPattern(elements: ts.BindingElement[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.BindingPattern {
        var node = Factory.beginNode<ts.BindingPattern>(ts.SyntaxKind.ArrayBindingPattern);
        node.elements = Factory.createNodeArray(elements);
        return Factory.finishNode(node, location, flags);
    }

    static updateArrayBindingPattern(node: ts.BindingPattern, elements: ts.BindingElement[]): ts.BindingPattern {
        if (node.elements !== elements) {
            return Factory.createArrayBindingPattern(elements, node, node.flags);
        }
        return node;
    }

    static createBindingElement(name: ts.BindingPattern | ts.Identifier, propertyName?: ts.Identifier, initializer?: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.BindingElement {
        var node = Factory.beginNode<ts.BindingElement>(ts.SyntaxKind.BindingElement);
        node.name = name;
        node.propertyName = propertyName;
        node.initializer = initializer;
        return Factory.finishNode(node, location, flags);
    }

    static updateBindingElement(node: ts.BindingElement, name: ts.BindingPattern | ts.Identifier, propertyName: ts.Identifier, initializer: ts.Expression): ts.BindingElement {
        if (node.name !== name || node.propertyName !== propertyName || node.initializer !== initializer) {
            return Factory.createBindingElement(name, propertyName, initializer, node, node.flags);
        }
        return node;
    }

    static createArrayLiteralExpression(elements: ts.Expression[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.ArrayLiteralExpression {
        var node = Factory.beginNode<ts.ArrayLiteralExpression>(ts.SyntaxKind.ArrayLiteralExpression);
        node.elements = Factory.createNodeArray(elements);
        return Factory.finishNode(node, location, flags);
    }

    static updateArrayLiteralExpression(node: ts.ArrayLiteralExpression, elements: ts.Expression[]): ts.ArrayLiteralExpression {
        if (node.elements !== elements) {
            return Factory.createArrayLiteralExpression(elements, node, node.flags);
        }
        return node;
    }

    static createObjectLiteralExpression(properties: ts.ObjectLiteralElement[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.ObjectLiteralExpression {
        var node = Factory.beginNode<ts.ObjectLiteralExpression>(ts.SyntaxKind.ObjectLiteralExpression);
        node.properties = Factory.createNodeArray(properties);
        return Factory.finishNode(node, location, flags);
    }

    static updateObjectLiteralExpression(node: ts.ObjectLiteralExpression, properties: ts.ObjectLiteralElement[]): ts.ObjectLiteralExpression {
        if (node.properties !== properties) {
            return Factory.createObjectLiteralExpression(properties, node, node.flags);
        }
        return node;
    }

    static createPropertyAccessExpression(expression: ts.LeftHandSideExpression, name: ts.Identifier, location?: ts.TextRange, flags?: ts.NodeFlags): ts.PropertyAccessExpression {
        var node = Factory.beginNode<ts.PropertyAccessExpression>(ts.SyntaxKind.PropertyAccessExpression);
        node.expression = expression;
        node.name = name;
        return Factory.finishNode(node, location, flags);
    }

    static updatePropertyAccessExpression(node: ts.PropertyAccessExpression, expression: ts.LeftHandSideExpression, name: ts.Identifier): ts.PropertyAccessExpression {
        if (node.expression !== expression || node.name !== name) {
            return Factory.createPropertyAccessExpression(expression, name, node, node.flags);
        }
        return node;
    }

    static createElementAccessExpression(expression: ts.LeftHandSideExpression, argumentExpression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ElementAccessExpression {
        var node = Factory.beginNode<ts.ElementAccessExpression>(ts.SyntaxKind.ElementAccessExpression);
        node.expression = expression;
        node.argumentExpression = argumentExpression;
        return Factory.finishNode(node, location, flags);
    }

    static updateElementAccessExpression(node: ts.ElementAccessExpression, expression: ts.LeftHandSideExpression, argumentExpression: ts.Expression): ts.ElementAccessExpression {
        if (node.expression !== expression || node.argumentExpression !== argumentExpression) {
            return Factory.createElementAccessExpression(expression, argumentExpression, node, node.flags);
        }
        return node;
    }

    static createCallExpression(expression: ts.LeftHandSideExpression, args: ts.Expression[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.CallExpression {
        var node = Factory.beginNode<ts.CallExpression>(ts.SyntaxKind.CallExpression);
        node.expression = expression;
        node.arguments = Factory.createNodeArray(args);
        return Factory.finishNode(node, location, flags);
    }

    static updateCallExpression(node: ts.CallExpression, expression: ts.LeftHandSideExpression, args: ts.Expression[]): ts.CallExpression {
        if (node.expression !== expression || node.arguments !== args) {
            return Factory.createCallExpression(expression, args, node, node.flags);
        }
        return node;
    }

    static createNewExpression(expression: ts.LeftHandSideExpression, args: ts.Expression[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.NewExpression {
        var node = Factory.beginNode<ts.NewExpression>(ts.SyntaxKind.NewExpression);
        node.expression = expression;
        node.arguments = Factory.createNodeArray(args);
        return Factory.finishNode(node, location, flags);
    }

    static updateNewExpression(node: ts.NewExpression, expression: ts.LeftHandSideExpression, args: ts.Expression[]): ts.NewExpression {
        if (node.expression !== expression || node.arguments !== args) {
            return Factory.createNewExpression(expression, args, node, node.flags);
        }
        return node;
    }

    static createTaggedTemplateExpression(tag: ts.LeftHandSideExpression, template: ts.LiteralExpression | ts.TemplateExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.TaggedTemplateExpression {
        var node = Factory.beginNode<ts.TaggedTemplateExpression>(ts.SyntaxKind.TaggedTemplateExpression);
        node.tag = tag;
        node.template = template;
        return Factory.finishNode(node, location, flags);
    }

    static updateTaggedTemplateExpression(node: ts.TaggedTemplateExpression, tag: ts.LeftHandSideExpression, template: ts.LiteralExpression | ts.TemplateExpression): ts.TaggedTemplateExpression {
        if (node.tag !== tag || node.template !== template) {
            return Factory.createTaggedTemplateExpression(tag, template, node, node.flags);
        }
        return node;
    }

    static createTypeAssertion(type: ts.TypeNode, expression: ts.UnaryExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.TypeAssertion {
        var node = Factory.beginNode<ts.TypeAssertion>(ts.SyntaxKind.TypeAssertionExpression);
        node.type = type;
        node.expression = expression;
        return Factory.finishNode(node, location, flags);
    }

    static updateTypeAssertion(node: ts.TypeAssertion, expression: ts.UnaryExpression): ts.TypeAssertion {
        if (node.expression !== expression) {
            return Factory.createTypeAssertion(node.type, expression, node, node.flags);
        }
        return node;
    }

    static createParenthesizedExpression(expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ParenthesizedExpression {
        var node = Factory.beginNode<ts.ParenthesizedExpression>(ts.SyntaxKind.ParenthesizedExpression);
        node.expression = expression;
        return Factory.finishNode(node, location, flags);
    }

    static updateParenthesizedExpression(node: ts.ParenthesizedExpression, expression: ts.Expression): ts.ParenthesizedExpression {
        if (node.expression !== expression) {
            return Factory.createParenthesizedExpression(expression, node, node.flags);
        }
        return node;
    }

    static createFunctionExpression(name: ts.Identifier, parameters: ts.ParameterDeclaration[], body: ts.Block | ts.Expression, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], asteriskToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.FunctionExpression {
        var node = Factory.beginNode<ts.FunctionExpression>(ts.SyntaxKind.FunctionExpression);
        node.name = name;
        node.parameters = Factory.createNodeArray(parameters);
        node.body = body;
        node.typeParameters = Factory.createNodeArray(typeParameters);
        node.type = type;
        node.modifiers = <ts.ModifiersArray>modifiers;
        node.asteriskToken = asteriskToken;
        return Factory.finishNode(node, location, flags, modifiers);
    }

    static updateFunctionExpression(node: ts.FunctionExpression, name: ts.Identifier, parameters: ts.ParameterDeclaration[], body: ts.Block | ts.Expression): ts.FunctionExpression {
        if (node.name !== name || node.parameters !== parameters || node.body !== body) {
            return Factory.createFunctionExpression(name, parameters, body, node.typeParameters, node.type, node.modifiers, node.asteriskToken, node, node.flags);
        }
        return node;
    }

    static createArrowFunction(parameters: ts.ParameterDeclaration[], body: ts.Block | ts.Expression, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.FunctionExpression {
        var node = Factory.beginNode<ts.FunctionExpression>(ts.SyntaxKind.ArrowFunction);
        node.parameters = Factory.createNodeArray(parameters);
        node.body = body;
        node.typeParameters = Factory.createNodeArray(typeParameters);
        node.type = type;
        node.modifiers = <ts.ModifiersArray>modifiers;
        return Factory.finishNode(node, location, flags, modifiers);
    }

    static updateArrowFunction(node: ts.FunctionExpression, parameters: ts.ParameterDeclaration[], body: ts.Block | ts.Expression): ts.FunctionExpression {
        if (node.parameters !== parameters || node.body !== body) {
            return Factory.createArrowFunction(parameters, body, node.typeParameters, node.type, node.modifiers, node, node.flags);
        }
        return node;
    }

    static createDeleteExpression(expression: ts.UnaryExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.DeleteExpression {
        var node = Factory.beginNode<ts.DeleteExpression>(ts.SyntaxKind.DeleteExpression);
        node.expression = expression;
        return Factory.finishNode(node, location, flags);
    }

    static updateDeleteExpression(node: ts.DeleteExpression, expression: ts.UnaryExpression): ts.DeleteExpression {
        if (node.expression !== expression) {
            return Factory.createDeleteExpression(expression, node, node.flags);
        }
        return node;
    }

    static createTypeOfExpression(expression: ts.UnaryExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.TypeOfExpression {
        var node = Factory.beginNode<ts.TypeOfExpression>(ts.SyntaxKind.TypeOfExpression);
        node.expression = expression;
        return Factory.finishNode(node, location, flags);
    }

    static updateTypeOfExpression(node: ts.TypeOfExpression, expression: ts.UnaryExpression): ts.TypeOfExpression {
        if (node.expression !== expression) {
            return Factory.createTypeOfExpression(expression, node, node.flags);
        }
        return node;
    }

    static createVoidExpression(expression: ts.UnaryExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.VoidExpression {
        var node = Factory.beginNode<ts.VoidExpression>(ts.SyntaxKind.VoidExpression);
        node.expression = expression;
        return Factory.finishNode(node, location, flags);
    }

    static updateVoidExpression(node: ts.VoidExpression, expression: ts.UnaryExpression): ts.VoidExpression {
        if (node.expression !== expression) {
            return Factory.createVoidExpression(expression, node, node.flags);
        }
        return node;
    }

    static createAwaitExpression(expression: ts.UnaryExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.AwaitExpression {
        var node = Factory.beginNode<ts.AwaitExpression>(ts.SyntaxKind.AwaitExpression);
        node.expression = expression;
        return Factory.finishNode(node, location, flags);
    }

    static updateAwaitExpression(node: ts.AwaitExpression, expression: ts.UnaryExpression): ts.AwaitExpression {
        if (node.expression !== expression) {
            return Factory.createAwaitExpression(expression, node, node.flags);
        }
        return node;
    }

    static createPrefixUnaryExpression(operator: ts.SyntaxKind, operand: ts.UnaryExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.PrefixUnaryExpression {
        var node = Factory.beginNode<ts.PrefixUnaryExpression>(ts.SyntaxKind.PrefixUnaryExpression);
        node.operator = operator;
        node.operand = operand;
        return Factory.finishNode(node, location, flags);
    }

    static updatePrefixUnaryExpression(node: ts.PrefixUnaryExpression, operand: ts.UnaryExpression): ts.PrefixUnaryExpression {
        if (node.operand !== operand) {
            return Factory.createPrefixUnaryExpression(node.operator, operand, node, node.flags);
        }
        return node;
    }

    static createPostfixUnaryExpression(operator: ts.SyntaxKind, operand: ts.LeftHandSideExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.PostfixUnaryExpression {
        var node = Factory.beginNode<ts.PostfixUnaryExpression>(ts.SyntaxKind.PostfixUnaryExpression);
        node.operator = operator;
        node.operand = operand;
        return Factory.finishNode(node, location, flags);
    }

    static updatePostfixUnaryExpression(node: ts.PostfixUnaryExpression, operand: ts.LeftHandSideExpression): ts.PostfixUnaryExpression {
        if (node.operand !== operand) {
            return Factory.createPostfixUnaryExpression(node.operator, operand, node, node.flags);
        }
        return node;
    }

    static createBinaryExpression(operator: ts.Node, left: ts.Expression, right: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.BinaryExpression {
        var node = Factory.beginNode<ts.BinaryExpression>(ts.SyntaxKind.BinaryExpression);
        node.operatorToken = operator;
        node.left = left;
        node.right = right;
        return Factory.finishNode(node, location, flags);
    }

    static updateBinaryExpression(node: ts.BinaryExpression, left: ts.Expression, right: ts.Expression): ts.BinaryExpression {
        if (node.left !== left || node.right !== right) {
            return Factory.createBinaryExpression(node.operatorToken, left, right, node, node.flags);
        }
        return node;
    }

    static createConditionalExpression(condition: ts.Expression, whenTrue: ts.Expression, whenFalse: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ConditionalExpression {
        var node = Factory.beginNode<ts.ConditionalExpression>(ts.SyntaxKind.ConditionalExpression);
        node.condition = condition;
        node.whenTrue = whenTrue;
        node.whenFalse = whenFalse;
        return Factory.finishNode(node, location, flags);
    }

    static updateConditionalExpression(node: ts.ConditionalExpression, condition: ts.Expression, whenTrue: ts.Expression, whenFalse: ts.Expression): ts.ConditionalExpression {
        if (node.condition !== condition || node.whenTrue !== whenTrue || node.whenFalse !== whenFalse) {
            return Factory.createConditionalExpression(condition, whenTrue, whenFalse, node, node.flags);
        }
        return node;
    }

    static createTemplateExpression(head: ts.LiteralExpression, templateSpans: ts.TemplateSpan[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.TemplateExpression {
        var node = Factory.beginNode<ts.TemplateExpression>(ts.SyntaxKind.TemplateExpression);
        node.head = head;
        node.templateSpans = Factory.createNodeArray(templateSpans);
        return Factory.finishNode(node, location, flags);
    }

    static updateTemplateExpression(node: ts.TemplateExpression, head: ts.LiteralExpression, templateSpans: ts.TemplateSpan[]): ts.TemplateExpression {
        if (node.head !== head || node.templateSpans !== templateSpans) {
            return Factory.createTemplateExpression(head, templateSpans, node, node.flags);
        }
        return node;
    }

    static createYieldExpression(expression: ts.Expression, asteriskToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.YieldExpression {
        var node = Factory.beginNode<ts.YieldExpression>(ts.SyntaxKind.YieldExpression);
        node.expression = expression;
        node.asteriskToken = asteriskToken;
        return Factory.finishNode(node, location, flags);
    }

    static updateYieldExpression(node: ts.YieldExpression, expression: ts.Expression): ts.YieldExpression {
        if (node.expression !== expression) {
            return Factory.createYieldExpression(expression, node.asteriskToken, node, node.flags);
        }
        return node;
    }
    /*
    static createGeneratedLabel(label: ts.Label, labelNumbers: number[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.GeneratedLabel {
        var node = Factory.beginNode<ts.GeneratedLabel>(ts.SyntaxKind.GeneratedLabel);
        node.label = label;
        node.labelNumbers = labelNumbers;
        return Factory.finishNode(node, location, flags);
    }
    */
    static createSpreadElementExpression(expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.SpreadElementExpression {
        var node = Factory.beginNode<ts.SpreadElementExpression>(ts.SyntaxKind.SpreadElementExpression);
        node.expression = expression;
        return Factory.finishNode(node, location, flags);
    }

    static updateSpreadElementExpression(node: ts.SpreadElementExpression, expression: ts.Expression): ts.SpreadElementExpression {
        if (node.expression !== expression) {
            return Factory.createSpreadElementExpression(expression, node, node.flags);
        }
        return node;
    }

    static createOmittedExpression(location?: ts.TextRange, flags?: ts.NodeFlags): ts.Expression {
        var node = Factory.beginNode<ts.Expression>(ts.SyntaxKind.OmittedExpression);
        return Factory.finishNode(node, location, flags);
    }

    static createTemplateSpan(expression: ts.Expression, literal: ts.LiteralExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.TemplateSpan {
        var node = Factory.beginNode<ts.TemplateSpan>(ts.SyntaxKind.TemplateSpan);
        node.expression = expression;
        node.literal = literal;
        return Factory.finishNode(node, location, flags);
    }

    static updateTemplateSpan(node: ts.TemplateSpan, expression: ts.Expression, literal: ts.LiteralExpression): ts.TemplateSpan {
        if (node.expression !== expression || node.literal !== literal) {
            return Factory.createTemplateSpan(expression, literal, node, node.flags);
        }
        return node;
    }

    static createBlock(statements: ts.Statement[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.Block {
        var node = Factory.beginNode<ts.Block>(ts.SyntaxKind.Block);
        node.statements = Factory.createNodeArray(statements);
        return Factory.finishNode(node, location, flags);
    }

    static updateBlock(node: ts.Block, statements: ts.Statement[]): ts.Block {
        if (node.statements !== statements) {
            return Factory.createBlock(statements, node, node.flags);
        }
        return node;
    }

    static createVariableStatement(declarationList: ts.VariableDeclarationList, location?: ts.TextRange, flags?: ts.NodeFlags): ts.VariableStatement {
        var node = Factory.beginNode<ts.VariableStatement>(ts.SyntaxKind.VariableStatement);
        node.declarationList = declarationList;
        return Factory.finishNode(node, location, flags);
    }

    static updateVariableStatement(node: ts.VariableStatement, declarationList: ts.VariableDeclarationList): ts.VariableStatement {
        if (node.declarationList !== declarationList) {
            return Factory.createVariableStatement(declarationList, node, node.flags);
        }
        return node;
    }

    static createEmptyStatement(location?: ts.TextRange, flags?: ts.NodeFlags): ts.Statement {
        var node = Factory.beginNode<ts.Statement>(ts.SyntaxKind.EmptyStatement);
        return Factory.finishNode(node, location, flags);
    }

    static createExpressionStatement(expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ExpressionStatement {
        var node = Factory.beginNode<ts.ExpressionStatement>(ts.SyntaxKind.ExpressionStatement);
        node.expression = expression;
        return Factory.finishNode(node, location, flags);
    }

    static updateExpressionStatement(node: ts.ExpressionStatement, expression: ts.Expression): ts.ExpressionStatement {
        if (node.expression !== expression) {
            return Factory.createExpressionStatement(expression, node, node.flags);
        }
        return node;
    }

    static createIfStatement(expression: ts.Expression, thenStatement: ts.Statement, elseStatement?: ts.Statement, location?: ts.TextRange, flags?: ts.NodeFlags): ts.IfStatement {
        var node = Factory.beginNode<ts.IfStatement>(ts.SyntaxKind.IfStatement);
        node.expression = expression;
        node.thenStatement = thenStatement;
        node.elseStatement = elseStatement;
        return Factory.finishNode(node, location, flags);
    }

    static updateIfStatement(node: ts.IfStatement, expression: ts.Expression, thenStatement: ts.Statement, elseStatement: ts.Statement): ts.IfStatement {
        if (node.expression !== expression || node.thenStatement !== thenStatement || node.elseStatement !== elseStatement) {
            return Factory.createIfStatement(expression, thenStatement, elseStatement, node, node.flags);
        }
        return node;
    }

    static createDoStatement(statement: ts.Statement, expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.DoStatement {
        var node = Factory.beginNode<ts.DoStatement>(ts.SyntaxKind.DoStatement);
        node.statement = statement;
        node.expression = expression;
        return Factory.finishNode(node, location, flags);
    }

    static updateDoStatement(node: ts.DoStatement, statement: ts.Statement, expression: ts.Expression): ts.DoStatement {
        if (node.statement !== statement || node.expression !== expression) {
            return Factory.createDoStatement(statement, expression, node, node.flags);
        }
        return node;
    }

    static createWhileStatement(expression: ts.Expression, statement: ts.Statement, location?: ts.TextRange, flags?: ts.NodeFlags): ts.WhileStatement {
        var node = Factory.beginNode<ts.WhileStatement>(ts.SyntaxKind.WhileStatement);
        node.expression = expression;
        node.statement = statement;
        return Factory.finishNode(node, location, flags);
    }

    static updateWhileStatement(node: ts.WhileStatement, expression: ts.Expression, statement: ts.Statement): ts.WhileStatement {
        if (node.expression !== expression || node.statement !== statement) {
            return Factory.createWhileStatement(expression, statement, node, node.flags);
        }
        return node;
    }

    static createForStatement(initializer: ts.Expression | ts.VariableDeclarationList, condition: ts.Expression, iterator: ts.Expression, statement: ts.Statement, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ForStatement {
        var node = Factory.beginNode<ts.ForStatement>(ts.SyntaxKind.ForStatement);
        node.initializer = initializer;
        node.condition = condition;
        node.incrementor = iterator;
        node.statement = statement;
        return Factory.finishNode(node, location, flags);
    }

    static updateForStatement(node: ts.ForStatement, initializer: ts.Expression | ts.VariableDeclarationList, condition: ts.Expression, iterator: ts.Expression, statement: ts.Statement): ts.ForStatement {
        if (node.initializer !== initializer || node.condition !== condition || node.incrementor !== iterator || node.statement !== statement) {
            return Factory.createForStatement(initializer, condition, iterator, statement, node, node.flags);
        }
        return node;
    }

    static createForInStatement(initializer: ts.Expression | ts.VariableDeclarationList, expression: ts.Expression, statement: ts.Statement, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ForInStatement {
        var node = Factory.beginNode<ts.ForInStatement>(ts.SyntaxKind.ForInStatement);
        node.initializer = initializer;
        node.expression = expression;
        node.statement = statement;
        return Factory.finishNode(node, location, flags);
    }

    static updateForInStatement(node: ts.ForInStatement, initializer: ts.Expression | ts.VariableDeclarationList, expression: ts.Expression, statement: ts.Statement): ts.ForInStatement {
        if (node.initializer !== initializer || node.expression !== expression || node.statement !== statement) {
            return Factory.createForInStatement(initializer, expression, statement, node, node.flags);
        }
        return node;
    }

    static createContinueStatement(label: ts.Identifier, location?: ts.TextRange, flags?: ts.NodeFlags): ts.BreakOrContinueStatement {
        var node = Factory.beginNode<ts.BreakOrContinueStatement>(ts.SyntaxKind.ContinueStatement);
        node.label = label;
        return Factory.finishNode(node, location, flags);
    }

    static updateContinueStatement(node: ts.BreakOrContinueStatement, label: ts.Identifier): ts.BreakOrContinueStatement {
        if (node.label !== label) {
            return Factory.createContinueStatement(label, node, node.flags);
        }
        return node;
    }

    static createBreakStatement(label: ts.Identifier, location?: ts.TextRange, flags?: ts.NodeFlags): ts.BreakOrContinueStatement {
        var node = Factory.beginNode<ts.BreakOrContinueStatement>(ts.SyntaxKind.BreakStatement);
        node.label = label;
        return Factory.finishNode(node, location, flags);
    }

    static updateBreakStatement(node: ts.BreakOrContinueStatement, label: ts.Identifier): ts.BreakOrContinueStatement {
        if (node.label !== label) {
            return Factory.createBreakStatement(label, node, node.flags);
        }
        return node;
    }

    static createReturnStatement(expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ReturnStatement {
        var node = Factory.beginNode<ts.ReturnStatement>(ts.SyntaxKind.ReturnStatement);
        node.expression = expression;
        return Factory.finishNode(node, location, flags);
    }

    static updateReturnStatement(node: ts.ReturnStatement, expression: ts.Expression): ts.ReturnStatement {
        if (node.expression !== expression) {
            return Factory.createReturnStatement(expression, node, node.flags);
        }
        return node;
    }

    static createWithStatement(expression: ts.Expression, statement: ts.Statement, location?: ts.TextRange, flags?: ts.NodeFlags): ts.WithStatement {
        var node = Factory.beginNode<ts.WithStatement>(ts.SyntaxKind.WithStatement);
        node.expression = expression;
        node.statement = statement;
        return Factory.finishNode(node, location, flags);
    }

    static updateWithStatement(node: ts.WithStatement, expression: ts.Expression, statement: ts.Statement): ts.WithStatement {
        if (node.expression !== expression || node.statement !== statement) {
            return Factory.createWithStatement(expression, statement, node, node.flags);
        }
        return node;
    }

    static createSwitchStatement(expression: ts.Expression, caseBlock: ts.CaseBlock, location?: ts.TextRange, flags?: ts.NodeFlags): ts.SwitchStatement {
        var node = Factory.beginNode<ts.SwitchStatement>(ts.SyntaxKind.SwitchStatement);
        node.expression = expression;
        node.caseBlock = caseBlock;
        return Factory.finishNode(node, location, flags);
    }

    static updateSwitchStatement(node: ts.SwitchStatement, expression: ts.Expression, caseBlock: ts.CaseBlock): ts.SwitchStatement {
        if (node.expression !== expression || node.caseBlock !== caseBlock) {
            return Factory.createSwitchStatement(expression, caseBlock, node, node.flags);
        }
        return node;
    }

    static createLabeledStatement(label: ts.Identifier, statement: ts.Statement, location?: ts.TextRange, flags?: ts.NodeFlags): ts.LabeledStatement {
        var node = Factory.beginNode<ts.LabeledStatement>(ts.SyntaxKind.LabeledStatement);
        node.label = label;
        node.statement = statement;
        return Factory.finishNode(node, location, flags);
    }

    static updateLabeledStatement(node: ts.LabeledStatement, label: ts.Identifier, statement: ts.Statement): ts.LabeledStatement {
        if (node.label !== label || node.statement !== statement) {
            return Factory.createLabeledStatement(label, statement, node, node.flags);
        }
        return node;
    }

    static createThrowStatement(expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ThrowStatement {
        var node = Factory.beginNode<ts.ThrowStatement>(ts.SyntaxKind.ThrowStatement);
        node.expression = expression;
        return Factory.finishNode(node, location, flags);
    }

    static updateThrowStatement(node: ts.ThrowStatement, expression: ts.Expression): ts.ThrowStatement {
        if (node.expression !== expression) {
            return Factory.createThrowStatement(expression, node, node.flags);
        }
        return node;
    }

    static createTryStatement(tryBlock: ts.Block, catchClause: ts.CatchClause, finallyBlock: ts.Block, location?: ts.TextRange, flags?: ts.NodeFlags): ts.TryStatement {
        var node = Factory.beginNode<ts.TryStatement>(ts.SyntaxKind.TryStatement);
        node.tryBlock = tryBlock;
        node.catchClause = catchClause;
        node.finallyBlock = finallyBlock;
        return Factory.finishNode(node, location, flags);
    }

    static updateTryStatement(node: ts.TryStatement, tryBlock: ts.Block, catchClause: ts.CatchClause, finallyBlock: ts.Block): ts.TryStatement {
        if (node.tryBlock !== tryBlock || node.catchClause !== catchClause || node.finallyBlock !== finallyBlock) {
            return Factory.createTryStatement(tryBlock, catchClause, finallyBlock, node, node.flags);
        }
        return node;
    }

    static createDebuggerStatement(location?: ts.TextRange, flags?: ts.NodeFlags): ts.Statement {
        var node = Factory.beginNode<ts.Statement>(ts.SyntaxKind.DebuggerStatement);
        return Factory.finishNode(node, location, flags);
    }

    static createVariableDeclaration(name: ts.BindingPattern | ts.Identifier, initializer?: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.VariableDeclaration {
        var node = Factory.beginNode<ts.VariableDeclaration>(ts.SyntaxKind.VariableDeclaration);
        node.name = name;
        node.initializer = initializer;
        return Factory.finishNode(node, location, flags);
    }

    static updateVariableDeclaration(node: ts.VariableDeclaration, name: ts.BindingPattern | ts.Identifier, initializer: ts.Expression): ts.VariableDeclaration {
        if (node.name !== name || node.initializer !== initializer) {
            return Factory.createVariableDeclaration(name, initializer, node, node.flags);
        }
        return node;
    }

    static createVariableDeclarationList(declarations: ts.VariableDeclaration[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.VariableDeclarationList {
        var node = Factory.beginNode<ts.VariableDeclarationList>(ts.SyntaxKind.VariableDeclarationList);
        node.declarations = Factory.createNodeArray(declarations);
        return Factory.finishNode(node, location, flags);
    }

    static updateVariableDeclarationList(node: ts.VariableDeclarationList, declarations: ts.VariableDeclaration[]): ts.VariableDeclarationList {
        if (node.declarations !== declarations) {
            return Factory.createVariableDeclarationList(declarations, node, node.flags);
        }
        return node;
    }

    static createFunctionDeclaration(name: ts.Identifier, parameters: ts.ParameterDeclaration[], body: ts.Block, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], asteriskToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.FunctionDeclaration {
        var node = Factory.beginNode<ts.FunctionDeclaration>(ts.SyntaxKind.FunctionDeclaration);
        node.name = name;
        node.parameters = Factory.createNodeArray(parameters);
        node.body = body;
        node.typeParameters = Factory.createNodeArray(typeParameters);
        node.type = type;
        node.modifiers = <ts.ModifiersArray>modifiers;
        node.asteriskToken = asteriskToken;
        return Factory.finishNode(node, location, flags, modifiers);
    }

    static updateFunctionDeclaration(node: ts.FunctionDeclaration, name: ts.Identifier, parameters: ts.ParameterDeclaration[], body: ts.Block): ts.FunctionDeclaration {
        if (node.name !== name || node.parameters !== parameters || node.body !== body) {
            return Factory.createFunctionDeclaration(name, parameters, body, node.typeParameters, node.type, node.modifiers, node.asteriskToken, node, node.flags);
        }
        return node;
    }

    static createCaseClause(expression: ts.Expression, statements: ts.Statement[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.CaseClause {
        var node = Factory.beginNode<ts.CaseClause>(ts.SyntaxKind.CaseClause);
        node.expression = expression;
        node.statements = Factory.createNodeArray(statements);
        return Factory.finishNode(node, location, flags);
    }

    static updateCaseClause(node: ts.CaseClause, expression: ts.Expression, statements: ts.Statement[]): ts.CaseClause {
        if (node.expression !== expression || node.statements !== statements) {
            return Factory.createCaseClause(expression, statements, node, node.flags);
        }
        return node;
    }

    static createDefaultClause(statements: ts.Statement[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.DefaultClause {
        var node = Factory.beginNode<ts.DefaultClause>(ts.SyntaxKind.DefaultClause);
        node.statements = Factory.createNodeArray(statements);
        return Factory.finishNode(node, location, flags);
    }

    static updateDefaultClause(node: ts.DefaultClause, statements: ts.Statement[]): ts.DefaultClause {
        if (node.statements !== statements) {
            return Factory.createDefaultClause(statements, node, node.flags);
        }
        return node;
    }

    static createCatchClause(name: ts.VariableDeclaration, block: ts.Block, location?: ts.TextRange, flags?: ts.NodeFlags): ts.CatchClause {
        var node = Factory.beginNode<ts.CatchClause>(ts.SyntaxKind.CatchClause);
        node.variableDeclaration = name;
        node.block = block;
        return Factory.finishNode(node, location, flags);
    }

    static updateCatchClause(node: ts.CatchClause, variableDeclaration: ts.VariableDeclaration, block: ts.Block): ts.CatchClause {
        if (node.variableDeclaration !== variableDeclaration || node.block !== block) {
            return Factory.createCatchClause(variableDeclaration, block, node, node.flags);
        }
        return node;
    }

    static createPropertyAssignment(name: ts.DeclarationName, initializer: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.PropertyAssignment {
        var node = Factory.beginNode<ts.PropertyAssignment>(ts.SyntaxKind.PropertyAssignment);
        node.name = name;
        node.initializer = initializer;
        return Factory.finishNode(node, location, flags);
    }

    static updatePropertyAssignment(node: ts.PropertyAssignment, name: ts.DeclarationName, initializer: ts.Expression): ts.PropertyAssignment {
        if (node.name !== name || node.initializer !== initializer) {
            return Factory.createPropertyAssignment(name, initializer, node, node.flags);
        }
        return node;
    }

    static createShorthandPropertyAssignment(name: ts.Identifier, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ShorthandPropertyAssignment {
        var node = Factory.beginNode<ts.ShorthandPropertyAssignment>(ts.SyntaxKind.ShorthandPropertyAssignment);
        node.name = name;
        return Factory.finishNode(node, location, flags);
    }

    static updateShorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, name: ts.Identifier): ts.ShorthandPropertyAssignment {
        if (node.name !== name) {
            return Factory.createShorthandPropertyAssignment(name, node, node.flags);
        }
        return node;
    }

    isLeftHandSideExpression(expr: ts.Node): boolean {
        if (expr) {
            switch (expr.kind) {
                case ts.SyntaxKind.PropertyAccessExpression:
                case ts.SyntaxKind.ElementAccessExpression:
                case ts.SyntaxKind.NewExpression:
                case ts.SyntaxKind.CallExpression:
                case ts.SyntaxKind.TaggedTemplateExpression:
                case ts.SyntaxKind.ArrayLiteralExpression:
                case ts.SyntaxKind.ParenthesizedExpression:
                case ts.SyntaxKind.ObjectLiteralExpression:
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.Identifier:
                case ts.SyntaxKind.RegularExpressionLiteral:
                case ts.SyntaxKind.NumericLiteral:
                case ts.SyntaxKind.StringLiteral:
                case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                case ts.SyntaxKind.TemplateExpression:
                case ts.SyntaxKind.FalseKeyword:
                case ts.SyntaxKind.NullKeyword:
                case ts.SyntaxKind.ThisKeyword:
                case ts.SyntaxKind.TrueKeyword:
                case ts.SyntaxKind.SuperKeyword:
                    return true;
            }
        }

        return false;
    }

    // expressions
    static createNodeArray<TNode extends ts.Node>(elements: TNode[] = [], location?: ts.TextRange): ts.NodeArray<TNode> {
        var nodeArray = <ts.NodeArray<TNode>>elements;
        if (location) {
            nodeArray.pos = location.pos;
            nodeArray.end = location.end;
        } else if (!("pos" in nodeArray && "end" in nodeArray)) {
            nodeArray.pos = -1;
            nodeArray.end = -1;
        }
        return nodeArray;
    }

    static createVoidZero(location?: ts.TextRange, flags?: ts.NodeFlags): ts.VoidExpression {
        return Factory.createVoidExpression(Factory.createNumericLiteral(0, location, flags), location, flags);
    }

    makeLeftHandSideExpression(expression: ts.Expression): ts.LeftHandSideExpression {
        if (this.isLeftHandSideExpression(expression)) {
            return <ts.LeftHandSideExpression>expression;
        }

        return Factory.createParenthesizedExpression(expression);
    }

    static createPropertyOrElementAccessExpression(expression: ts.LeftHandSideExpression, propName: ts.Identifier | ts.LiteralExpression): ts.LeftHandSideExpression {
        if (propName.kind !== ts.SyntaxKind.Identifier) {
            return Factory.createElementAccessExpression(expression, propName);
        }
        return Factory.createPropertyAccessExpression(expression, <ts.Identifier>propName);
    }

    static updateFunctionLikeDeclaration(node: ts.FunctionLikeDeclaration, name: ts.DeclarationName, body: ts.Expression | ts.Block, parameters: ts.ParameterDeclaration[]): ts.FunctionLikeDeclaration {
        switch (node.kind) {
            case ts.SyntaxKind.FunctionDeclaration:
                return this.updateFunctionDeclaration(<ts.FunctionDeclaration>node, <ts.Identifier>name, parameters, <ts.Block>body);
            case ts.SyntaxKind.MethodDeclaration:
                return this.updateMethodDeclaration(<ts.MethodDeclaration>node, name, parameters, <ts.Block>body);
            case ts.SyntaxKind.GetAccessor:
                return this.updateGetAccessor(<ts.AccessorDeclaration>node, name, parameters, <ts.Block>body);
            case ts.SyntaxKind.FunctionExpression:
                return this.updateFunctionExpression(<ts.FunctionExpression>node, <ts.Identifier>name, parameters, body);
            case ts.SyntaxKind.ArrowFunction:
                return this.updateArrowFunction(<ts.FunctionExpression>node, parameters, body);
        }
        return node;
    }
}

export class Visitor {
    static fallback<TNode extends ts.Node>(node: TNode, cbNode: IVisitor, state?: any): TNode {
        if (!cbNode || !node) {
            return node;
        }
        return <TNode>Visitor.accept(node, cbNode, state);
    }

    static accept(node: ts.Node, cbNode: IVisitor, state?: any): ts.Node {
        switch (node.kind) {
            case ts.SyntaxKind.QualifiedName:
                return Factory.updateQualifiedName(
                    <ts.QualifiedName>node,
                    this.visit<ts.EntityName>((<ts.QualifiedName>node).left, cbNode, state),
                    this.visit<ts.Identifier>((<ts.QualifiedName>node).right, cbNode, state));
            case ts.SyntaxKind.ComputedPropertyName:
                return Factory.updateComputedPropertyName(
                    <ts.ComputedPropertyName>node,
                    this.visit<ts.Expression>((<ts.ComputedPropertyName>node).expression, cbNode, state));
            case ts.SyntaxKind.TypeParameter:
                return Factory.updateTypeParameter(
                    <ts.TypeParameterDeclaration>node,
                    this.visit<ts.Identifier>((<ts.TypeParameterDeclaration>node).name, cbNode, state),
                    this.visit<ts.TypeNode>((<ts.TypeParameterDeclaration>node).constraint, cbNode, state));
            case ts.SyntaxKind.Parameter:
                return Factory.updateParameterDeclaration(
                    <ts.ParameterDeclaration>node,
                    this.visit<ts.BindingPattern | ts.Identifier>((<ts.ParameterDeclaration>node).name, cbNode, state),
                    this.visit<ts.Expression>((<ts.ParameterDeclaration>node).initializer, cbNode, state),
                    this.visit<ts.TypeNode>((<ts.ParameterDeclaration>node).type, cbNode, state));
            case ts.SyntaxKind.PropertySignature:
                return Factory.updatePropertySignature(
                    <ts.PropertyDeclaration>node,
                    this.visit<ts.DeclarationName>((<ts.PropertyDeclaration>node).name, cbNode, state),
                    this.visit<ts.TypeNode>((<ts.PropertyDeclaration>node).type, cbNode, state));
            case ts.SyntaxKind.PropertyDeclaration:
                return Factory.updatePropertyDeclaration(
                    <ts.PropertyDeclaration>node,
                    this.visit<ts.DeclarationName>((<ts.PropertyDeclaration>node).name, cbNode, state),
                    this.visit<ts.Expression>((<ts.PropertyDeclaration>node).initializer, cbNode, state),
                    this.visit<ts.TypeNode>((<ts.PropertyDeclaration>node).type, cbNode, state));
            case ts.SyntaxKind.MethodSignature:
                return Factory.updateMethodSignature(
                    <ts.MethodDeclaration>node,
                    this.visit<ts.DeclarationName>((<ts.MethodDeclaration>node).name, cbNode, state),
                    this.visitNodes<ts.ParameterDeclaration>((<ts.MethodDeclaration>node).parameters, cbNode, state));
            case ts.SyntaxKind.MethodDeclaration:
                return Factory.updateMethodDeclaration(
                    <ts.MethodDeclaration>node,
                    this.visit<ts.DeclarationName>((<ts.MethodDeclaration>node).name, cbNode, state),
                    this.visitNodes<ts.ParameterDeclaration>((<ts.MethodDeclaration>node).parameters, cbNode, state),
                    this.visit<ts.Block>((<ts.MethodDeclaration>node).body, cbNode, state));
            case ts.SyntaxKind.Constructor:
                return Factory.updateConstructor(
                    <ts.ConstructorDeclaration>node,
                    this.visitNodes<ts.ParameterDeclaration>((<ts.ConstructorDeclaration>node).parameters, cbNode, state),
                    this.visit<ts.Block>((<ts.ConstructorDeclaration>node).body, cbNode, state));
            case ts.SyntaxKind.GetAccessor:
                return Factory.updateGetAccessor(
                    <ts.AccessorDeclaration>node,
                    this.visit<ts.DeclarationName>((<ts.AccessorDeclaration>node).name, cbNode, state),
                    this.visitNodes<ts.ParameterDeclaration>((<ts.AccessorDeclaration>node).parameters, cbNode, state),
                    this.visit<ts.Block>((<ts.AccessorDeclaration>node).body, cbNode, state));
            case ts.SyntaxKind.SetAccessor:
                return Factory.updateSetAccessor(
                    <ts.AccessorDeclaration>node,
                    this.visit<ts.DeclarationName>((<ts.AccessorDeclaration>node).name, cbNode, state),
                    this.visitNodes<ts.ParameterDeclaration>((<ts.AccessorDeclaration>node).parameters, cbNode, state),
                    this.visit<ts.Block>((<ts.AccessorDeclaration>node).body, cbNode, state));
            case ts.SyntaxKind.CallSignature:
                return Factory.updateCallSignature(
                    <ts.SignatureDeclaration>node,
                    this.visitNodes<ts.ParameterDeclaration>((<ts.SignatureDeclaration>node).parameters, cbNode, state));
            case ts.SyntaxKind.ConstructSignature:
                return Factory.updateConstructSignature(
                    <ts.SignatureDeclaration>node,
                    this.visitNodes<ts.ParameterDeclaration>((<ts.SignatureDeclaration>node).parameters, cbNode, state));
            case ts.SyntaxKind.IndexSignature:
                return Factory.updateIndexSignature(
                    <ts.IndexSignatureDeclaration>node,
                    this.visitNodes<ts.ParameterDeclaration>((<ts.IndexSignatureDeclaration>node).parameters, cbNode, state));
            case ts.SyntaxKind.ObjectBindingPattern:
                return Factory.updateObjectBindingPattern(
                    <ts.BindingPattern>node,
                    this.visitNodes<ts.BindingElement>((<ts.BindingPattern>node).elements, cbNode, state));
            case ts.SyntaxKind.ArrayBindingPattern:
                return Factory.updateArrayBindingPattern(
                    <ts.BindingPattern>node,
                    this.visitNodes<ts.BindingElement>((<ts.BindingPattern>node).elements, cbNode, state));
            case ts.SyntaxKind.BindingElement:
                return Factory.updateBindingElement(
                    <ts.BindingElement>node,
                    this.visit<ts.BindingPattern | ts.Identifier>((<ts.BindingElement>node).name, cbNode, state),
                    this.visit<ts.Identifier>((<ts.BindingElement>node).propertyName, cbNode, state),
                    this.visit<ts.Expression>((<ts.BindingElement>node).initializer, cbNode, state));
            case ts.SyntaxKind.ArrayLiteralExpression:
                return Factory.updateArrayLiteralExpression(
                    <ts.ArrayLiteralExpression>node,
                    this.visitNodes<ts.Expression>((<ts.ArrayLiteralExpression>node).elements, cbNode, state));
            case ts.SyntaxKind.ObjectLiteralExpression:
                return Factory.updateObjectLiteralExpression(
                    <ts.ObjectLiteralExpression>node,
                    this.visitNodes<ts.ObjectLiteralElement>((<ts.ObjectLiteralExpression>node).properties, cbNode, state));
            case ts.SyntaxKind.PropertyAccessExpression:
                return Factory.updatePropertyAccessExpression(
                    <ts.PropertyAccessExpression>node,
                    this.visit<ts.LeftHandSideExpression>((<ts.PropertyAccessExpression>node).expression, cbNode, state),
                    this.visit<ts.Identifier>((<ts.PropertyAccessExpression>node).name, cbNode, state));
            case ts.SyntaxKind.ElementAccessExpression:
                return Factory.updateElementAccessExpression(
                    <ts.ElementAccessExpression>node,
                    this.visit<ts.LeftHandSideExpression>((<ts.ElementAccessExpression>node).expression, cbNode, state),
                    this.visit<ts.Expression>((<ts.ElementAccessExpression>node).argumentExpression, cbNode, state));
            case ts.SyntaxKind.CallExpression:
                return Factory.updateCallExpression(
                    <ts.CallExpression>node,
                    this.visit<ts.LeftHandSideExpression>((<ts.CallExpression>node).expression, cbNode, state),
                    this.visitNodes<ts.Expression>((<ts.CallExpression>node).arguments, cbNode, state));
            case ts.SyntaxKind.NewExpression:
                return Factory.updateNewExpression(
                    <ts.NewExpression>node,
                    this.visit<ts.LeftHandSideExpression>((<ts.NewExpression>node).expression, cbNode, state),
                    this.visitNodes<ts.Expression>((<ts.NewExpression>node).arguments, cbNode, state));
            case ts.SyntaxKind.TaggedTemplateExpression:
                return Factory.updateTaggedTemplateExpression(
                    <ts.TaggedTemplateExpression>node,
                    this.visit<ts.LeftHandSideExpression>((<ts.TaggedTemplateExpression>node).tag, cbNode, state),
                    this.visit<ts.LiteralExpression | ts.TemplateExpression>((<ts.TaggedTemplateExpression>node).template, cbNode, state));
            case ts.SyntaxKind.TypeAssertionExpression:
                return Factory.updateTypeAssertion(
                    <ts.TypeAssertion>node,
                    this.visit<ts.UnaryExpression>((<ts.TypeAssertion>node).expression, cbNode, state));
            case ts.SyntaxKind.ParenthesizedExpression:
                return Factory.updateParenthesizedExpression(
                    <ts.ParenthesizedExpression>node,
                    this.visit<ts.Expression>((<ts.ParenthesizedExpression>node).expression, cbNode, state));
            case ts.SyntaxKind.FunctionExpression:
                return Factory.updateFunctionExpression(
                    <ts.FunctionExpression>node,
                    this.visit<ts.Identifier>((<ts.FunctionExpression>node).name, cbNode, state),
                    this.visitNodes<ts.ParameterDeclaration>((<ts.FunctionExpression>node).parameters, cbNode, state),
                    this.visit<ts.Block | ts.Expression>((<ts.FunctionExpression>node).body, cbNode, state));
            case ts.SyntaxKind.ArrowFunction:
                return Factory.updateArrowFunction(
                    <ts.FunctionExpression>node,
                    this.visitNodes<ts.ParameterDeclaration>((<ts.FunctionExpression>node).parameters, cbNode, state),
                    this.visit<ts.Block | ts.Expression>((<ts.FunctionExpression>node).body, cbNode, state));
            case ts.SyntaxKind.DeleteExpression:
                return Factory.updateDeleteExpression(
                    <ts.DeleteExpression>node,
                    this.visit<ts.UnaryExpression>((<ts.DeleteExpression>node).expression, cbNode, state));
            case ts.SyntaxKind.TypeOfExpression:
                return Factory.updateTypeOfExpression(
                    <ts.TypeOfExpression>node,
                    this.visit<ts.UnaryExpression>((<ts.TypeOfExpression>node).expression, cbNode, state));
            case ts.SyntaxKind.VoidExpression:
                return Factory.updateVoidExpression(
                    <ts.VoidExpression>node,
                    this.visit<ts.UnaryExpression>((<ts.VoidExpression>node).expression, cbNode, state));
            case ts.SyntaxKind.AwaitExpression:
                return Factory.updateAwaitExpression(
                    <ts.AwaitExpression>node,
                    this.visit<ts.UnaryExpression>((<ts.AwaitExpression>node).expression, cbNode, state));
            case ts.SyntaxKind.PrefixUnaryExpression:
                return Factory.updatePrefixUnaryExpression(
                    <ts.PrefixUnaryExpression>node,
                    this.visit<ts.UnaryExpression>((<ts.PrefixUnaryExpression>node).operand, cbNode, state));
            case ts.SyntaxKind.PostfixUnaryExpression:
                return Factory.updatePostfixUnaryExpression(
                    <ts.PostfixUnaryExpression>node,
                    this.visit<ts.LeftHandSideExpression>((<ts.PostfixUnaryExpression>node).operand, cbNode, state));
            case ts.SyntaxKind.BinaryExpression:
                return Factory.updateBinaryExpression(
                    <ts.BinaryExpression>node,
                    this.visit<ts.Expression>((<ts.BinaryExpression>node).left, cbNode, state),
                    this.visit<ts.Expression>((<ts.BinaryExpression>node).right, cbNode, state));
            case ts.SyntaxKind.ConditionalExpression:
                return Factory.updateConditionalExpression(
                    <ts.ConditionalExpression>node,
                    this.visit<ts.Expression>((<ts.ConditionalExpression>node).condition, cbNode, state),
                    this.visit<ts.Expression>((<ts.ConditionalExpression>node).whenTrue, cbNode, state),
                    this.visit<ts.Expression>((<ts.ConditionalExpression>node).whenFalse, cbNode, state));
            case ts.SyntaxKind.TemplateExpression:
                return Factory.updateTemplateExpression(
                    <ts.TemplateExpression>node,
                    this.visit<ts.LiteralExpression>((<ts.TemplateExpression>node).head, cbNode, state),
                    this.visitNodes<ts.TemplateSpan>((<ts.TemplateExpression>node).templateSpans, cbNode, state));
            case ts.SyntaxKind.YieldExpression:
                return Factory.updateYieldExpression(
                    <ts.YieldExpression>node,
                    this.visit<ts.Expression>((<ts.YieldExpression>node).expression, cbNode, state));
            case ts.SyntaxKind.SpreadElementExpression:
                return Factory.updateSpreadElementExpression(
                    <ts.SpreadElementExpression>node,
                    this.visit<ts.Expression>((<ts.SpreadElementExpression>node).expression, cbNode, state));
            case ts.SyntaxKind.TemplateSpan:
                return Factory.updateTemplateSpan(
                    <ts.TemplateSpan>node,
                    this.visit<ts.Expression>((<ts.TemplateSpan>node).expression, cbNode, state),
                    this.visit<ts.LiteralExpression>((<ts.TemplateSpan>node).literal, cbNode, state));
            case ts.SyntaxKind.Block:
                return Factory.updateBlock(
                    <ts.Block>node,
                    this.visitNodes<ts.Statement>((<ts.Block>node).statements, cbNode, state));
            case ts.SyntaxKind.VariableStatement:
                return Factory.updateVariableStatement(
                    <ts.VariableStatement>node,
                    this.visit<ts.VariableDeclarationList>((<ts.VariableStatement>node).declarationList, cbNode, state));
            case ts.SyntaxKind.ExpressionStatement:
                return Factory.updateExpressionStatement(
                    <ts.ExpressionStatement>node,
                    this.visit<ts.Expression>((<ts.ExpressionStatement>node).expression, cbNode, state));
            case ts.SyntaxKind.IfStatement:
                return Factory.updateIfStatement(
                    <ts.IfStatement>node,
                    this.visit<ts.Expression>((<ts.IfStatement>node).expression, cbNode, state),
                    this.visit<ts.Statement>((<ts.IfStatement>node).thenStatement, cbNode, state),
                    this.visit<ts.Statement>((<ts.IfStatement>node).elseStatement, cbNode, state));
            case ts.SyntaxKind.DoStatement:
                return Factory.updateDoStatement(
                    <ts.DoStatement>node,
                    this.visit<ts.Statement>((<ts.DoStatement>node).statement, cbNode, state),
                    this.visit<ts.Expression>((<ts.DoStatement>node).expression, cbNode, state));
            case ts.SyntaxKind.WhileStatement:
                return Factory.updateWhileStatement(
                    <ts.WhileStatement>node,
                    this.visit<ts.Expression>((<ts.WhileStatement>node).expression, cbNode, state),
                    this.visit<ts.Statement>((<ts.WhileStatement>node).statement, cbNode, state));
            case ts.SyntaxKind.ForStatement:
                return Factory.updateForStatement(
                    <ts.ForStatement>node,
                    this.visit<ts.Expression | ts.VariableDeclarationList>((<ts.ForStatement>node).initializer, cbNode, state),
                    this.visit<ts.Expression>((<ts.ForStatement>node).condition, cbNode, state),
                    this.visit<ts.Expression>((<ts.ForStatement>node).incrementor, cbNode, state),
                    this.visit<ts.Statement>((<ts.ForStatement>node).statement, cbNode, state));
            case ts.SyntaxKind.ForInStatement:
                return Factory.updateForInStatement(
                    <ts.ForInStatement>node,
                    this.visit<ts.Expression | ts.VariableDeclarationList>((<ts.ForInStatement>node).initializer, cbNode, state),
                    this.visit<ts.Expression>((<ts.ForInStatement>node).expression, cbNode, state),
                    this.visit<ts.Statement>((<ts.ForInStatement>node).statement, cbNode, state));
            case ts.SyntaxKind.ContinueStatement:
                return Factory.updateContinueStatement(
                    <ts.BreakOrContinueStatement>node,
                    this.visit<ts.Identifier>((<ts.BreakOrContinueStatement>node).label, cbNode, state));
            case ts.SyntaxKind.BreakStatement:
                return Factory.updateBreakStatement(
                    <ts.BreakOrContinueStatement>node,
                    this.visit<ts.Identifier>((<ts.BreakOrContinueStatement>node).label, cbNode, state));
            case ts.SyntaxKind.ReturnStatement:
                return Factory.updateReturnStatement(
                    <ts.ReturnStatement>node,
                    this.visit<ts.Expression>((<ts.ReturnStatement>node).expression, cbNode, state));
            case ts.SyntaxKind.WithStatement:
                return Factory.updateWithStatement(
                    <ts.WithStatement>node,
                    this.visit<ts.Expression>((<ts.WithStatement>node).expression, cbNode, state),
                    this.visit<ts.Statement>((<ts.WithStatement>node).statement, cbNode, state));
            case ts.SyntaxKind.SwitchStatement:
                return Factory.updateSwitchStatement(
                    <ts.SwitchStatement>node,
                    this.visit<ts.Expression>((<ts.SwitchStatement>node).expression, cbNode, state),
                    this.visit<ts.CaseBlock>((<ts.SwitchStatement>node).caseBlock, cbNode, state));
            case ts.SyntaxKind.LabeledStatement:
                return Factory.updateLabeledStatement(
                    <ts.LabeledStatement>node,
                    this.visit<ts.Identifier>((<ts.LabeledStatement>node).label, cbNode, state),
                    this.visit<ts.Statement>((<ts.LabeledStatement>node).statement, cbNode, state));
            case ts.SyntaxKind.ThrowStatement:
                return Factory.updateThrowStatement(
                    <ts.ThrowStatement>node,
                    this.visit<ts.Expression>((<ts.ThrowStatement>node).expression, cbNode, state));
            case ts.SyntaxKind.TryStatement:
                return Factory.updateTryStatement(
                    <ts.TryStatement>node,
                    this.visit<ts.Block>((<ts.TryStatement>node).tryBlock, cbNode, state),
                    this.visit<ts.CatchClause>((<ts.TryStatement>node).catchClause, cbNode, state),
                    this.visit<ts.Block>((<ts.TryStatement>node).finallyBlock, cbNode, state));
            case ts.SyntaxKind.VariableDeclaration:
                return Factory.updateVariableDeclaration(
                    <ts.VariableDeclaration>node,
                    this.visit<ts.BindingPattern | ts.Identifier>((<ts.VariableDeclaration>node).name, cbNode, state),
                    this.visit<ts.Expression>((<ts.VariableDeclaration>node).initializer, cbNode, state));
            case ts.SyntaxKind.VariableDeclarationList:
                return Factory.updateVariableDeclarationList(
                    <ts.VariableDeclarationList>node,
                    this.visitNodes<ts.VariableDeclaration>((<ts.VariableDeclarationList>node).declarations, cbNode, state));
            case ts.SyntaxKind.FunctionDeclaration:
                return Factory.updateFunctionDeclaration(
                    <ts.FunctionDeclaration>node,
                    this.visit<ts.Identifier>((<ts.FunctionDeclaration>node).name, cbNode, state),
                    this.visitNodes<ts.ParameterDeclaration>((<ts.FunctionDeclaration>node).parameters, cbNode, state),
                    this.visit<ts.Block>((<ts.FunctionDeclaration>node).body, cbNode, state));
            case ts.SyntaxKind.CaseClause:
                return Factory.updateCaseClause(
                    <ts.CaseClause>node,
                    this.visit<ts.Expression>((<ts.CaseClause>node).expression, cbNode, state),
                    this.visitNodes<ts.Statement>((<ts.CaseClause>node).statements, cbNode, state));
            case ts.SyntaxKind.DefaultClause:
                return Factory.updateDefaultClause(
                    <ts.DefaultClause>node,
                    this.visitNodes<ts.Statement>((<ts.DefaultClause>node).statements, cbNode, state));
            case ts.SyntaxKind.CatchClause:
                return Factory.updateCatchClause(
                    <ts.CatchClause>node,
                    this.visit<ts.VariableDeclaration>((<ts.CatchClause>node).variableDeclaration, cbNode, state),
                    this.visit<ts.Block>((<ts.CatchClause>node).block, cbNode, state));
            case ts.SyntaxKind.PropertyAssignment:
                return Factory.updatePropertyAssignment(
                    <ts.PropertyAssignment>node,
                    this.visit<ts.DeclarationName>((<ts.PropertyAssignment>node).name, cbNode, state),
                    this.visit<ts.Expression>((<ts.PropertyAssignment>node).initializer, cbNode, state));
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                return Factory.updateShorthandPropertyAssignment(
                    <ts.ShorthandPropertyAssignment>node,
                    this.visit<ts.Identifier>((<ts.ShorthandPropertyAssignment>node).name, cbNode, state));
            default:
                return node;
        }
    }

    static visit<TNode extends ts.Node>(node: TNode, cbNode: IVisitor, state?: any): TNode {
        if (!cbNode || !node) {
            return node;
        }

        return <TNode>cbNode(node, state);
    }

    static visitNodes<TNode extends ts.Node>(nodes: ts.NodeArray<TNode>, cbNode: IVisitor, state?: any, shouldCacheNode?: (node: ts.Node, state: any) => boolean, cacheNode?: (node: TNode, state: any) => TNode, removeMissingNodes?: boolean): ts.NodeArray<TNode> {
        if (!nodes || !cbNode) {
            return nodes;
        }

        var updatedNodes: TNode[];
        var updatedOffset = 0;
        var cacheOffset = 0;

        for (var i = 0; i < nodes.length; i++) {
            var updatedIndex = i - updatedOffset;
            var node = nodes[i];
            if (shouldCacheNode && shouldCacheNode(node, state)) {
                if (!updatedNodes) {
                    updatedNodes = nodes.slice(0, i);
                }
                if (cacheNode) {
                    while (cacheOffset < updatedIndex) {
                        updatedNodes[cacheOffset] = cacheNode(updatedNodes[cacheOffset], state);
                        cacheOffset++;
                    }
                }
                cacheOffset = updatedIndex;
            }
            var updatedNode = <TNode>Visitor.visit(node, cbNode, state);
            if ((updatedNodes || updatedNode !== node || (!updatedNode && removeMissingNodes))) {
                if (!updatedNodes) {
                    updatedNodes = nodes.slice(0, i);
                }
                if (!updatedNode && removeMissingNodes) {
                    updatedOffset++;
                }
                else {
                    updatedNodes[i - updatedOffset] = updatedNode;
                }
            }
        }
        if (updatedNodes) {
            return Factory.createNodeArray(updatedNodes, nodes);
        }
        return nodes;
    }
}

export interface IVisitor { <TNode extends ts.Node>(node: TNode, state?: any): TNode; }

console.log("Hello World");