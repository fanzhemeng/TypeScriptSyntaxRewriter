/// <reference path="Scripts/typings/node/node.d.ts" />

import * as ts from "typescript";

module tss {
    export module Factory {
        export function createStringLiteral(text: string, location?: ts.TextRange, flags?: ts.NodeFlags): ts.StringLiteral {
            var node = beginNode<ts.StringLiteral>(ts.SyntaxKind.StringLiteral);
            node.text = text;
            return finishNode(node, location, flags);
        }

        export function createNumericLiteral(value: number | string, location?: ts.TextRange, flags?: ts.NodeFlags): ts.LiteralExpression {
            var node = beginNode<ts.LiteralExpression>(ts.SyntaxKind.NumericLiteral);
            node.text = String(value);
            return finishNode(node, location, flags);
        }

        export function createIdentifier(text: string, location?: ts.TextRange, flags?: ts.NodeFlags): ts.Identifier {
            var node = beginNode<ts.Identifier>(ts.SyntaxKind.Identifier);
            node.text = text;
            return finishNode(node, location, flags);
        }

        export function createQualifiedName(left: ts.EntityName, right: ts.Identifier, location?: ts.TextRange, flags?: ts.NodeFlags): ts.QualifiedName {
            var node = beginNode<ts.QualifiedName>(ts.SyntaxKind.QualifiedName);
            node.left = left;
            node.right = right;
            return finishNode(node, location, flags);
        }

        export function updateQualifiedName(node: ts.QualifiedName, left: ts.EntityName, right: ts.Identifier): ts.QualifiedName {
            if (node.left !== left || node.right !== right) {
                return createQualifiedName(left, right, node, node.flags);
            }
            return node;
        }

        export function createComputedPropertyName(expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ComputedPropertyName {
            var node = beginNode<ts.ComputedPropertyName>(ts.SyntaxKind.ComputedPropertyName);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateComputedPropertyName(node: ts.ComputedPropertyName, expression: ts.Expression): ts.ComputedPropertyName {
            if (node.expression !== expression) {
                return createComputedPropertyName(expression, node, node.flags);
            }
            return node;
        }

        export function createTypeParameter(name: ts.Identifier, constraint?: ts.TypeNode, expression?: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.TypeParameterDeclaration {
            var node = beginNode<ts.TypeParameterDeclaration>(ts.SyntaxKind.TypeParameter);
            node.name = name;
            node.constraint = constraint;
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateTypeParameter(node: ts.TypeParameterDeclaration, name: ts.Identifier, constraint: ts.TypeNode): ts.TypeParameterDeclaration {
            if (node.name !== name || node.constraint !== constraint) {
                return createTypeParameter(name, constraint, node.expression, node, node.flags);
            }
            return node;
        }

        export function createParameterDeclaration(name: ts.BindingPattern | ts.Identifier, initializer?: ts.Expression, type?: ts.TypeNode, modifiers?: ts.Node[], dotDotDotToken?: ts.Node, questionToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ParameterDeclaration {
            var node = beginNode<ts.ParameterDeclaration>(ts.SyntaxKind.Parameter);
            node.name = name;
            node.initializer = initializer;
            node.type = type;
            node.modifiers = <ts.ModifiersArray>modifiers;
            node.dotDotDotToken = dotDotDotToken;
            node.questionToken = questionToken;
            return finishNode(node, location, flags, modifiers);
        }

        export function updateParameterDeclaration(node: ts.ParameterDeclaration, name: ts.BindingPattern | ts.Identifier, initializer: ts.Expression, type: ts.TypeNode): ts.ParameterDeclaration {
            if (node.name !== name || node.initializer !== initializer || node.type !== type) {
                return createParameterDeclaration(name, initializer, type, node.modifiers, node.dotDotDotToken, node.questionToken, node, node.flags);
            }
            return node;
        }
        
        export function createPropertySignature(name: ts.DeclarationName, type?: ts.TypeNode, questionToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.PropertyDeclaration {
            var node = beginNode<ts.PropertyDeclaration>(ts.SyntaxKind.PropertySignature);
            node.name = name;
            node.type = type;
            node.questionToken = questionToken;
            return finishNode(node, location, flags);
        }

        export function updatePropertySignature(node: ts.PropertyDeclaration, name: ts.DeclarationName, type: ts.TypeNode): ts.PropertyDeclaration {
            if (node.name !== name || node.type !== type) {
                return createPropertySignature(name, type, node.questionToken, node, node.flags);
            }
            return node;
        }

        export function createPropertyDeclaration(name: ts.DeclarationName, initializer?: ts.Expression, type?: ts.TypeNode, questionToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.PropertyDeclaration {
            var node = beginNode<ts.PropertyDeclaration>(ts.SyntaxKind.PropertyDeclaration);
            node.name = name;
            node.initializer = initializer;
            node.type = type;
            node.questionToken = questionToken;
            return finishNode(node, location, flags);
        }

        export function updatePropertyDeclaration(node: ts.PropertyDeclaration, name: ts.DeclarationName, initializer: ts.Expression, type: ts.TypeNode): ts.PropertyDeclaration {
            if (node.name !== name || node.initializer !== initializer || node.type !== type) {
                return createPropertyDeclaration(name, initializer, type, node.questionToken, node, node.flags);
            }
            return node;
        }

        export function createMethodSignature(name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], asteriskToken?: ts.Node, questionToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.MethodDeclaration {
            var node = beginNode<ts.MethodDeclaration>(ts.SyntaxKind.MethodSignature);
            node.name = name;
            node.parameters = createNodeArray(parameters);
            node.typeParameters = createNodeArray(typeParameters);
            node.type = type;
            node.modifiers = <ts.ModifiersArray>modifiers;
            node.asteriskToken = asteriskToken;
            node.questionToken = questionToken;
            return finishNode(node, location, flags, modifiers);
        }

        export function updateMethodSignature(node: ts.MethodDeclaration, name: ts.DeclarationName, parameters: ts.ParameterDeclaration[]): ts.MethodDeclaration {
            if (node.name !== name || node.parameters !== parameters) {
                return createMethodSignature(name, parameters, node.typeParameters, node.type, node.modifiers, node.asteriskToken, node.questionToken, node, node.flags);
            }
            return node;
        }

        export function createMethodDeclaration(name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], body: ts.Block, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], asteriskToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.MethodDeclaration {
            var node = beginNode<ts.MethodDeclaration>(ts.SyntaxKind.MethodDeclaration);
            node.name = name;
            node.parameters = createNodeArray(parameters);
            node.body = body;
            node.typeParameters = createNodeArray(typeParameters);
            node.type = type;
            node.modifiers = <ts.ModifiersArray>modifiers;
            node.asteriskToken = asteriskToken;
            return finishNode(node, location, flags, modifiers);
        }

        export function updateMethodDeclaration(node: ts.MethodDeclaration, name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], body: ts.Block): ts.MethodDeclaration {
            if (node.name !== name || node.parameters !== parameters || node.body !== body) {
                return createMethodDeclaration(name, parameters, body, node.typeParameters, node.type, node.modifiers, node.asteriskToken, node, node.flags);
            }
            return node;
        }

        export function createConstructor(parameters: ts.ParameterDeclaration[], body: ts.Block, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.ConstructorDeclaration {
            var node = beginNode<ts.ConstructorDeclaration>(ts.SyntaxKind.Constructor);
            node.parameters = createNodeArray(parameters);
            node.body = body;
            node.typeParameters = createNodeArray(typeParameters);
            node.type = type;
            node.modifiers = <ts.ModifiersArray>modifiers;
            return finishNode(node, location, flags, modifiers);
        }

        export function updateConstructor(node: ts.ConstructorDeclaration, parameters: ts.ParameterDeclaration[], body: ts.Block): ts.ConstructorDeclaration {
            if (node.parameters !== parameters || node.body !== body) {
                return createConstructor(parameters, body, node.typeParameters, node.type, node.modifiers, node, node.flags);
            }
            return node;
        }

        export function createGetAccessor(name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], body: ts.Block, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.AccessorDeclaration {
            var node = beginNode<ts.AccessorDeclaration>(ts.SyntaxKind.GetAccessor);
            node.name = name;
            node.parameters = createNodeArray(parameters);
            node.body = body;
            node.typeParameters = createNodeArray(typeParameters);
            node.type = type;
            node.modifiers = <ts.ModifiersArray>modifiers;
            return finishNode(node, location, flags, modifiers);
        }

        export function updateGetAccessor(node: ts.AccessorDeclaration, name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], body: ts.Block): ts.AccessorDeclaration {
            if (node.name !== name || node.parameters !== parameters || node.body !== body) {
                return createGetAccessor(name, parameters, body, node.typeParameters, node.type, node.modifiers, node, node.flags);
            }
            return node;
        }

        export function createSetAccessor(name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], body: ts.Block, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.AccessorDeclaration {
            var node = beginNode<ts.AccessorDeclaration>(ts.SyntaxKind.SetAccessor);
            node.name = name;
            node.parameters = createNodeArray(parameters);
            node.body = body;
            node.typeParameters = createNodeArray(typeParameters);
            node.type = type;
            node.modifiers = <ts.ModifiersArray>modifiers;
            return finishNode(node, location, flags, modifiers);
        }

        export function updateSetAccessor(node: ts.AccessorDeclaration, name: ts.DeclarationName, parameters: ts.ParameterDeclaration[], body: ts.Block): ts.AccessorDeclaration {
            if (node.name !== name || node.parameters !== parameters || node.body !== body) {
                return createSetAccessor(name, parameters, body, node.typeParameters, node.type, node.modifiers, node, node.flags);
            }
            return node;
        }

        export function createCallSignature(parameters: ts.ParameterDeclaration[], typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.SignatureDeclaration {
            var node = beginNode<ts.SignatureDeclaration>(ts.SyntaxKind.CallSignature);
            node.parameters = createNodeArray(parameters);
            node.typeParameters = createNodeArray(typeParameters);
            node.type = type;
            node.modifiers = <ts.ModifiersArray>modifiers;
            return finishNode(node, location, flags, modifiers);
        }

        export function updateCallSignature(node: ts.SignatureDeclaration, parameters: ts.ParameterDeclaration[]): ts.SignatureDeclaration {
            if (node.parameters !== parameters) {
                return createCallSignature(parameters, node.typeParameters, node.type, node.modifiers, node, node.flags);
            }
            return node;
        }

        export function createConstructSignature(parameters: ts.ParameterDeclaration[], typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.SignatureDeclaration {
            var node = beginNode<ts.SignatureDeclaration>(ts.SyntaxKind.ConstructSignature);
            node.parameters = createNodeArray(parameters);
            node.typeParameters = createNodeArray(typeParameters);
            node.type = type;
            node.modifiers = <ts.ModifiersArray>modifiers;
            return finishNode(node, location, flags, modifiers);
        }

        export function updateConstructSignature(node: ts.SignatureDeclaration, parameters: ts.ParameterDeclaration[]): ts.SignatureDeclaration {
            if (node.parameters !== parameters) {
                return createConstructSignature(parameters, node.typeParameters, node.type, node.modifiers, node, node.flags);
            }
            return node;
        }

        export function createIndexSignature(parameters: ts.ParameterDeclaration[], typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.IndexSignatureDeclaration {
            var node = beginNode<ts.IndexSignatureDeclaration>(ts.SyntaxKind.IndexSignature);
            node.parameters = createNodeArray(parameters);
            node.typeParameters = createNodeArray(typeParameters);
            node.type = type;
            node.modifiers = <ts.ModifiersArray>modifiers;
            return finishNode(node, location, flags, modifiers);
        }

        export function updateIndexSignature(node: ts.IndexSignatureDeclaration, parameters: ts.ParameterDeclaration[]): ts.IndexSignatureDeclaration {
            if (node.parameters !== parameters) {
                return createIndexSignature(parameters, node.typeParameters, node.type, node.modifiers, node, node.flags);
            }
            return node;
        }

        export function createObjectBindingPattern(elements: ts.BindingElement[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.BindingPattern {
            var node = beginNode<ts.BindingPattern>(ts.SyntaxKind.ObjectBindingPattern);
            node.elements = createNodeArray(elements);
            return finishNode(node, location, flags);
        }

        export function updateObjectBindingPattern(node: ts.BindingPattern, elements: ts.BindingElement[]): ts.BindingPattern {
            if (node.elements !== elements) {
                return createObjectBindingPattern(elements, node, node.flags);
            }
            return node;
        }

        export function createArrayBindingPattern(elements: ts.BindingElement[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.BindingPattern {
            var node = beginNode<ts.BindingPattern>(ts.SyntaxKind.ArrayBindingPattern);
            node.elements = createNodeArray(elements);
            return finishNode(node, location, flags);
        }

        export function updateArrayBindingPattern(node: ts.BindingPattern, elements: ts.BindingElement[]): ts.BindingPattern {
            if (node.elements !== elements) {
                return createArrayBindingPattern(elements, node, node.flags);
            }
            return node;
        }

        export function createBindingElement(name: ts.BindingPattern | ts.Identifier, propertyName?: ts.Identifier, initializer?: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.BindingElement {
            var node = beginNode<ts.BindingElement>(ts.SyntaxKind.BindingElement);
            node.name = name;
            node.propertyName = propertyName;
            node.initializer = initializer;
            return finishNode(node, location, flags);
        }

        export function updateBindingElement(node: ts.BindingElement, name: ts.BindingPattern | ts.Identifier, propertyName: ts.Identifier, initializer: ts.Expression): ts.BindingElement {
            if (node.name !== name || node.propertyName !== propertyName || node.initializer !== initializer) {
                return createBindingElement(name, propertyName, initializer, node, node.flags);
            }
            return node;
        }

        export function createArrayLiteralExpression(elements: ts.Expression[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.ArrayLiteralExpression {
            var node = beginNode<ts.ArrayLiteralExpression>(ts.SyntaxKind.ArrayLiteralExpression);
            node.elements = createNodeArray(elements);
            return finishNode(node, location, flags);
        }

        export function updateArrayLiteralExpression(node: ts.ArrayLiteralExpression, elements: ts.Expression[]): ts.ArrayLiteralExpression {
            if (node.elements !== elements) {
                return createArrayLiteralExpression(elements, node, node.flags);
            }
            return node;
        }

        export function createObjectLiteralExpression(properties: ts.ObjectLiteralElement[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.ObjectLiteralExpression {
            var node = beginNode<ts.ObjectLiteralExpression>(ts.SyntaxKind.ObjectLiteralExpression);
            node.properties = createNodeArray(properties);
            return finishNode(node, location, flags);
        }

        export function updateObjectLiteralExpression(node: ts.ObjectLiteralExpression, properties: ts.ObjectLiteralElement[]): ts.ObjectLiteralExpression {
            if (node.properties !== properties) {
                return createObjectLiteralExpression(properties, node, node.flags);
            }
            return node;
        }

        export function createPropertyAccessExpression(expression: ts.LeftHandSideExpression, name: ts.Identifier, location?: ts.TextRange, flags?: ts.NodeFlags): ts.PropertyAccessExpression {
            var node = beginNode<ts.PropertyAccessExpression>(ts.SyntaxKind.PropertyAccessExpression);
            node.expression = expression;
            node.name = name;
            return finishNode(node, location, flags);
        }

        export function updatePropertyAccessExpression(node: ts.PropertyAccessExpression, expression: ts.LeftHandSideExpression, name: ts.Identifier): ts.PropertyAccessExpression {
            if (node.expression !== expression || node.name !== name) {
                return createPropertyAccessExpression(expression, name, node, node.flags);
            }
            return node;
        }

        export function createElementAccessExpression(expression: ts.LeftHandSideExpression, argumentExpression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ElementAccessExpression {
            var node = beginNode<ts.ElementAccessExpression>(ts.SyntaxKind.ElementAccessExpression);
            node.expression = expression;
            node.argumentExpression = argumentExpression;
            return finishNode(node, location, flags);
        }

        export function updateElementAccessExpression(node: ts.ElementAccessExpression, expression: ts.LeftHandSideExpression, argumentExpression: ts.Expression): ts.ElementAccessExpression {
            if (node.expression !== expression || node.argumentExpression !== argumentExpression) {
                return createElementAccessExpression(expression, argumentExpression, node, node.flags);
            }
            return node;
        }

        export function createCallExpression(expression: ts.LeftHandSideExpression, args: ts.Expression[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.CallExpression {
            var node = beginNode<ts.CallExpression>(ts.SyntaxKind.CallExpression);
            node.expression = expression;
            node.arguments = createNodeArray(args);
            return finishNode(node, location, flags);
        }

        export function updateCallExpression(node: ts.CallExpression, expression: ts.LeftHandSideExpression, args: ts.Expression[]): ts.CallExpression {
            if (node.expression !== expression || node.arguments !== args) {
                return createCallExpression(expression, args, node, node.flags);
            }
            return node;
        }

        export function createNewExpression(expression: ts.LeftHandSideExpression, args: ts.Expression[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.NewExpression {
            var node = beginNode<ts.NewExpression>(ts.SyntaxKind.NewExpression);
            node.expression = expression;
            node.arguments = createNodeArray(args);
            return finishNode(node, location, flags);
        }

        export function updateNewExpression(node: ts.NewExpression, expression: ts.LeftHandSideExpression, args: ts.Expression[]): ts.NewExpression {
            if (node.expression !== expression || node.arguments !== args) {
                return createNewExpression(expression, args, node, node.flags);
            }
            return node;
        }

        export function createTaggedTemplateExpression(tag: ts.LeftHandSideExpression, template: ts.LiteralExpression | ts.TemplateExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.TaggedTemplateExpression {
            var node = beginNode<ts.TaggedTemplateExpression>(ts.SyntaxKind.TaggedTemplateExpression);
            node.tag = tag;
            node.template = template;
            return finishNode(node, location, flags);
        }

        export function updateTaggedTemplateExpression(node: ts.TaggedTemplateExpression, tag: ts.LeftHandSideExpression, template: ts.LiteralExpression | ts.TemplateExpression): ts.TaggedTemplateExpression {
            if (node.tag !== tag || node.template !== template) {
                return createTaggedTemplateExpression(tag, template, node, node.flags);
            }
            return node;
        }

        export function createTypeAssertion(type: ts.TypeNode, expression: ts.UnaryExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.TypeAssertion {
            var node = beginNode<ts.TypeAssertion>(ts.SyntaxKind.TypeAssertionExpression);
            node.type = type;
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateTypeAssertion(node: ts.TypeAssertion, expression: ts.UnaryExpression): ts.TypeAssertion {
            if (node.expression !== expression) {
                return createTypeAssertion(node.type, expression, node, node.flags);
            }
            return node;
        }

        export function createParenthesizedExpression(expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ParenthesizedExpression {
            var node = beginNode<ts.ParenthesizedExpression>(ts.SyntaxKind.ParenthesizedExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateParenthesizedExpression(node: ts.ParenthesizedExpression, expression: ts.Expression): ts.ParenthesizedExpression {
            if (node.expression !== expression) {
                return createParenthesizedExpression(expression, node, node.flags);
            }
            return node;
        }

        export function createFunctionExpression(name: ts.Identifier, parameters: ts.ParameterDeclaration[], body: ts.Block | ts.Expression, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], asteriskToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.FunctionExpression {
            var node = beginNode<ts.FunctionExpression>(ts.SyntaxKind.FunctionExpression);
            node.name = name;
            node.parameters = createNodeArray(parameters);
            node.body = body;
            node.typeParameters = createNodeArray(typeParameters);
            node.type = type;
            node.modifiers = <ts.ModifiersArray>modifiers;
            node.asteriskToken = asteriskToken;
            return finishNode(node, location, flags, modifiers);
        }

        export function updateFunctionExpression(node: ts.FunctionExpression, name: ts.Identifier, parameters: ts.ParameterDeclaration[], body: ts.Block | ts.Expression): ts.FunctionExpression {
            if (node.name !== name || node.parameters !== parameters || node.body !== body) {
                return createFunctionExpression(name, parameters, body, node.typeParameters, node.type, node.modifiers, node.asteriskToken, node, node.flags);
            }
            return node;
        }

        export function createArrowFunction(parameters: ts.ParameterDeclaration[], body: ts.Block | ts.Expression, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.FunctionExpression {
            var node = beginNode<ts.FunctionExpression>(ts.SyntaxKind.ArrowFunction);
            node.parameters = createNodeArray(parameters);
            node.body = body;
            node.typeParameters = createNodeArray(typeParameters);
            node.type = type;
            node.modifiers = <ts.ModifiersArray>modifiers;
            return finishNode(node, location, flags, modifiers);
        }

        export function updateArrowFunction(node: ts.FunctionExpression, parameters: ts.ParameterDeclaration[], body: ts.Block | ts.Expression): ts.FunctionExpression {
            if (node.parameters !== parameters || node.body !== body) {
                return createArrowFunction(parameters, body, node.typeParameters, node.type, node.modifiers, node, node.flags);
            }
            return node;
        }

        export function createDeleteExpression(expression: ts.UnaryExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.DeleteExpression {
            var node = beginNode<ts.DeleteExpression>(ts.SyntaxKind.DeleteExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateDeleteExpression(node: ts.DeleteExpression, expression: ts.UnaryExpression): ts.DeleteExpression {
            if (node.expression !== expression) {
                return createDeleteExpression(expression, node, node.flags);
            }
            return node;
        }

        export function createTypeOfExpression(expression: ts.UnaryExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.TypeOfExpression {
            var node = beginNode<ts.TypeOfExpression>(ts.SyntaxKind.TypeOfExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateTypeOfExpression(node: ts.TypeOfExpression, expression: ts.UnaryExpression): ts.TypeOfExpression {
            if (node.expression !== expression) {
                return createTypeOfExpression(expression, node, node.flags);
            }
            return node;
        }

        export function createVoidExpression(expression: ts.UnaryExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.VoidExpression {
            var node = beginNode<ts.VoidExpression>(ts.SyntaxKind.VoidExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateVoidExpression(node: ts.VoidExpression, expression: ts.UnaryExpression): ts.VoidExpression {
            if (node.expression !== expression) {
                return createVoidExpression(expression, node, node.flags);
            }
            return node;
        }

        export function createAwaitExpression(expression: ts.UnaryExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.AwaitExpression {
            var node = beginNode<ts.AwaitExpression>(ts.SyntaxKind.AwaitExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateAwaitExpression(node: ts.AwaitExpression, expression: ts.UnaryExpression): ts.AwaitExpression {
            if (node.expression !== expression) {
                return createAwaitExpression(expression, node, node.flags);
            }
            return node;
        }

        export function createPrefixUnaryExpression(operator: ts.SyntaxKind, operand: ts.UnaryExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.PrefixUnaryExpression {
            var node = beginNode<ts.PrefixUnaryExpression>(ts.SyntaxKind.PrefixUnaryExpression);
            node.operator = operator;
            node.operand = operand;
            return finishNode(node, location, flags);
        }

        export function updatePrefixUnaryExpression(node: ts.PrefixUnaryExpression, operand: ts.UnaryExpression): ts.PrefixUnaryExpression {
            if (node.operand !== operand) {
                return createPrefixUnaryExpression(node.operator, operand, node, node.flags);
            }
            return node;
        }

        export function createPostfixUnaryExpression(operator: ts.SyntaxKind, operand: ts.LeftHandSideExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.PostfixUnaryExpression {
            var node = beginNode<ts.PostfixUnaryExpression>(ts.SyntaxKind.PostfixUnaryExpression);
            node.operator = operator;
            node.operand = operand;
            return finishNode(node, location, flags);
        }

        export function updatePostfixUnaryExpression(node: ts.PostfixUnaryExpression, operand: ts.LeftHandSideExpression): ts.PostfixUnaryExpression {
            if (node.operand !== operand) {
                return createPostfixUnaryExpression(node.operator, operand, node, node.flags);
            }
            return node;
        }

        export function createBinaryExpression(operator: ts.Node, left: ts.Expression, right: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.BinaryExpression {
            var node = beginNode<ts.BinaryExpression>(ts.SyntaxKind.BinaryExpression);
            node.operatorToken = operator;
            node.left = left;
            node.right = right;
            return finishNode(node, location, flags);
        }

        export function updateBinaryExpression(node: ts.BinaryExpression, left: ts.Expression, right: ts.Expression): ts.BinaryExpression {
            if (node.left !== left || node.right !== right) {
                return createBinaryExpression(node.operatorToken, left, right, node, node.flags);
            }
            return node;
        }

        export function createConditionalExpression(condition: ts.Expression, whenTrue: ts.Expression, whenFalse: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ConditionalExpression {
            var node = beginNode<ts.ConditionalExpression>(ts.SyntaxKind.ConditionalExpression);
            node.condition = condition;
            node.whenTrue = whenTrue;
            node.whenFalse = whenFalse;
            return finishNode(node, location, flags);
        }

        export function updateConditionalExpression(node: ts.ConditionalExpression, condition: ts.Expression, whenTrue: ts.Expression, whenFalse: ts.Expression): ts.ConditionalExpression {
            if (node.condition !== condition || node.whenTrue !== whenTrue || node.whenFalse !== whenFalse) {
                return createConditionalExpression(condition, whenTrue, whenFalse, node, node.flags);
            }
            return node;
        }

        export function createTemplateExpression(head: ts.LiteralExpression, templateSpans: ts.TemplateSpan[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.TemplateExpression {
            var node = beginNode<ts.TemplateExpression>(ts.SyntaxKind.TemplateExpression);
            node.head = head;
            node.templateSpans = createNodeArray(templateSpans);
            return finishNode(node, location, flags);
        }

        export function updateTemplateExpression(node: ts.TemplateExpression, head: ts.LiteralExpression, templateSpans: ts.TemplateSpan[]): ts.TemplateExpression {
            if (node.head !== head || node.templateSpans !== templateSpans) {
                return createTemplateExpression(head, templateSpans, node, node.flags);
            }
            return node;
        }

        export function createYieldExpression(expression: ts.Expression, asteriskToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.YieldExpression {
            var node = beginNode<ts.YieldExpression>(ts.SyntaxKind.YieldExpression);
            node.expression = expression;
            node.asteriskToken = asteriskToken;
            return finishNode(node, location, flags);
        }

        export function updateYieldExpression(node: ts.YieldExpression, expression: ts.Expression): ts.YieldExpression {
            if (node.expression !== expression) {
                return createYieldExpression(expression, node.asteriskToken, node, node.flags);
            }
            return node;
        }
        /*
        export function createGeneratedLabel(label: ts.Label, labelNumbers: number[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.GeneratedLabel {
            var node = beginNode<ts.GeneratedLabel>(ts.SyntaxKind.GeneratedLabel);
            node.label = label;
            node.labelNumbers = labelNumbers;
            return finishNode(node, location, flags);
        }
        */
        export function createSpreadElementExpression(expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.SpreadElementExpression {
            var node = beginNode<ts.SpreadElementExpression>(ts.SyntaxKind.SpreadElementExpression);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateSpreadElementExpression(node: ts.SpreadElementExpression, expression: ts.Expression): ts.SpreadElementExpression {
            if (node.expression !== expression) {
                return createSpreadElementExpression(expression, node, node.flags);
            }
            return node;
        }

        export function createOmittedExpression(location?: ts.TextRange, flags?: ts.NodeFlags): ts.Expression {
            var node = beginNode<ts.Expression>(ts.SyntaxKind.OmittedExpression);
            return finishNode(node, location, flags);
        }

        export function createTemplateSpan(expression: ts.Expression, literal: ts.LiteralExpression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.TemplateSpan {
            var node = beginNode<ts.TemplateSpan>(ts.SyntaxKind.TemplateSpan);
            node.expression = expression;
            node.literal = literal;
            return finishNode(node, location, flags);
        }

        export function updateTemplateSpan(node: ts.TemplateSpan, expression: ts.Expression, literal: ts.LiteralExpression): ts.TemplateSpan {
            if (node.expression !== expression || node.literal !== literal) {
                return createTemplateSpan(expression, literal, node, node.flags);
            }
            return node;
        }

        export function createBlock(statements: ts.Statement[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.Block {
            var node = beginNode<ts.Block>(ts.SyntaxKind.Block);
            node.statements = createNodeArray(statements);
            return finishNode(node, location, flags);
        }

        export function updateBlock(node: ts.Block, statements: ts.Statement[]): ts.Block {
            if (node.statements !== statements) {
                return createBlock(statements, node, node.flags);
            }
            return node;
        }

        export function createVariableStatement(declarationList: ts.VariableDeclarationList, location?: ts.TextRange, flags?: ts.NodeFlags): ts.VariableStatement {
            var node = beginNode<ts.VariableStatement>(ts.SyntaxKind.VariableStatement);
            node.declarationList = declarationList;
            return finishNode(node, location, flags);
        }

        export function updateVariableStatement(node: ts.VariableStatement, declarationList: ts.VariableDeclarationList): ts.VariableStatement {
            if (node.declarationList !== declarationList) {
                return createVariableStatement(declarationList, node, node.flags);
            }
            return node;
        }

        export function createEmptyStatement(location?: ts.TextRange, flags?: ts.NodeFlags): ts.Statement {
            var node = beginNode<ts.Statement>(ts.SyntaxKind.EmptyStatement);
            return finishNode(node, location, flags);
        }

        export function createExpressionStatement(expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ExpressionStatement {
            var node = beginNode<ts.ExpressionStatement>(ts.SyntaxKind.ExpressionStatement);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateExpressionStatement(node: ts.ExpressionStatement, expression: ts.Expression): ts.ExpressionStatement {
            if (node.expression !== expression) {
                return createExpressionStatement(expression, node, node.flags);
            }
            return node;
        }

        export function createIfStatement(expression: ts.Expression, thenStatement: ts.Statement, elseStatement?: ts.Statement, location?: ts.TextRange, flags?: ts.NodeFlags): ts.IfStatement {
            var node = beginNode<ts.IfStatement>(ts.SyntaxKind.IfStatement);
            node.expression = expression;
            node.thenStatement = thenStatement;
            node.elseStatement = elseStatement;
            return finishNode(node, location, flags);
        }

        export function updateIfStatement(node: ts.IfStatement, expression: ts.Expression, thenStatement: ts.Statement, elseStatement: ts.Statement): ts.IfStatement {
            if (node.expression !== expression || node.thenStatement !== thenStatement || node.elseStatement !== elseStatement) {
                return createIfStatement(expression, thenStatement, elseStatement, node, node.flags);
            }
            return node;
        }

        export function createDoStatement(statement: ts.Statement, expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.DoStatement {
            var node = beginNode<ts.DoStatement>(ts.SyntaxKind.DoStatement);
            node.statement = statement;
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateDoStatement(node: ts.DoStatement, statement: ts.Statement, expression: ts.Expression): ts.DoStatement {
            if (node.statement !== statement || node.expression !== expression) {
                return createDoStatement(statement, expression, node, node.flags);
            }
            return node;
        }

        export function createWhileStatement(expression: ts.Expression, statement: ts.Statement, location?: ts.TextRange, flags?: ts.NodeFlags): ts.WhileStatement {
            var node = beginNode<ts.WhileStatement>(ts.SyntaxKind.WhileStatement);
            node.expression = expression;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateWhileStatement(node: ts.WhileStatement, expression: ts.Expression, statement: ts.Statement): ts.WhileStatement {
            if (node.expression !== expression || node.statement !== statement) {
                return createWhileStatement(expression, statement, node, node.flags);
            }
            return node;
        }

        export function createForStatement(initializer: ts.Expression | ts.VariableDeclarationList, condition: ts.Expression, iterator: ts.Expression, statement: ts.Statement, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ForStatement {
            var node = beginNode<ts.ForStatement>(ts.SyntaxKind.ForStatement);
            node.initializer = initializer;
            node.condition = condition;
            node.incrementor = iterator;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateForStatement(node: ts.ForStatement, initializer: ts.Expression | ts.VariableDeclarationList, condition: ts.Expression, iterator: ts.Expression, statement: ts.Statement): ts.ForStatement {
            if (node.initializer !== initializer || node.condition !== condition || node.incrementor !== iterator || node.statement !== statement) {
                return createForStatement(initializer, condition, iterator, statement, node, node.flags);
            }
            return node;
        }

        export function createForInStatement(initializer: ts.Expression | ts.VariableDeclarationList, expression: ts.Expression, statement: ts.Statement, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ForInStatement {
            var node = beginNode<ts.ForInStatement>(ts.SyntaxKind.ForInStatement);
            node.initializer = initializer;
            node.expression = expression;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateForInStatement(node: ts.ForInStatement, initializer: ts.Expression | ts.VariableDeclarationList, expression: ts.Expression, statement: ts.Statement): ts.ForInStatement {
            if (node.initializer !== initializer || node.expression !== expression || node.statement !== statement) {
                return createForInStatement(initializer, expression, statement, node, node.flags);
            }
            return node;
        }

        export function createContinueStatement(label: ts.Identifier, location?: ts.TextRange, flags?: ts.NodeFlags): ts.BreakOrContinueStatement {
            var node = beginNode<ts.BreakOrContinueStatement>(ts.SyntaxKind.ContinueStatement);
            node.label = label;
            return finishNode(node, location, flags);
        }

        export function updateContinueStatement(node: ts.BreakOrContinueStatement, label: ts.Identifier): ts.BreakOrContinueStatement {
            if (node.label !== label) {
                return createContinueStatement(label, node, node.flags);
            }
            return node;
        }

        export function createBreakStatement(label: ts.Identifier, location?: ts.TextRange, flags?: ts.NodeFlags): ts.BreakOrContinueStatement {
            var node = beginNode<ts.BreakOrContinueStatement>(ts.SyntaxKind.BreakStatement);
            node.label = label;
            return finishNode(node, location, flags);
        }

        export function updateBreakStatement(node: ts.BreakOrContinueStatement, label: ts.Identifier): ts.BreakOrContinueStatement {
            if (node.label !== label) {
                return createBreakStatement(label, node, node.flags);
            }
            return node;
        }

        export function createReturnStatement(expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ReturnStatement {
            var node = beginNode<ts.ReturnStatement>(ts.SyntaxKind.ReturnStatement);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateReturnStatement(node: ts.ReturnStatement, expression: ts.Expression): ts.ReturnStatement {
            if (node.expression !== expression) {
                return createReturnStatement(expression, node, node.flags);
            }
            return node;
        }

        export function createWithStatement(expression: ts.Expression, statement: ts.Statement, location?: ts.TextRange, flags?: ts.NodeFlags): ts.WithStatement {
            var node = beginNode<ts.WithStatement>(ts.SyntaxKind.WithStatement);
            node.expression = expression;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateWithStatement(node: ts.WithStatement, expression: ts.Expression, statement: ts.Statement): ts.WithStatement {
            if (node.expression !== expression || node.statement !== statement) {
                return createWithStatement(expression, statement, node, node.flags);
            }
            return node;
        }

        export function createSwitchStatement(expression: ts.Expression, caseBlock: ts.CaseBlock, location?: ts.TextRange, flags?: ts.NodeFlags): ts.SwitchStatement {
            var node = beginNode<ts.SwitchStatement>(ts.SyntaxKind.SwitchStatement);
            node.expression = expression;
            node.caseBlock = caseBlock;
            return finishNode(node, location, flags);
        }

        export function updateSwitchStatement(node: ts.SwitchStatement, expression: ts.Expression, caseBlock: ts.CaseBlock): ts.SwitchStatement {
            if (node.expression !== expression || node.caseBlock !== caseBlock) {
                return createSwitchStatement(expression, caseBlock, node, node.flags);
            }
            return node;
        }

        export function createLabeledStatement(label: ts.Identifier, statement: ts.Statement, location?: ts.TextRange, flags?: ts.NodeFlags): ts.LabeledStatement {
            var node = beginNode<ts.LabeledStatement>(ts.SyntaxKind.LabeledStatement);
            node.label = label;
            node.statement = statement;
            return finishNode(node, location, flags);
        }

        export function updateLabeledStatement(node: ts.LabeledStatement, label: ts.Identifier, statement: ts.Statement): ts.LabeledStatement {
            if (node.label !== label || node.statement !== statement) {
                return createLabeledStatement(label, statement, node, node.flags);
            }
            return node;
        }

        export function createThrowStatement(expression: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ThrowStatement {
            var node = beginNode<ts.ThrowStatement>(ts.SyntaxKind.ThrowStatement);
            node.expression = expression;
            return finishNode(node, location, flags);
        }

        export function updateThrowStatement(node: ts.ThrowStatement, expression: ts.Expression): ts.ThrowStatement {
            if (node.expression !== expression) {
                return createThrowStatement(expression, node, node.flags);
            }
            return node;
        }

        export function createTryStatement(tryBlock: ts.Block, catchClause: ts.CatchClause, finallyBlock: ts.Block, location?: ts.TextRange, flags?: ts.NodeFlags): ts.TryStatement {
            var node = beginNode<ts.TryStatement>(ts.SyntaxKind.TryStatement);
            node.tryBlock = tryBlock;
            node.catchClause = catchClause;
            node.finallyBlock = finallyBlock;
            return finishNode(node, location, flags);
        }

        export function updateTryStatement(node: ts.TryStatement, tryBlock: ts.Block, catchClause: ts.CatchClause, finallyBlock: ts.Block): ts.TryStatement {
            if (node.tryBlock !== tryBlock || node.catchClause !== catchClause || node.finallyBlock !== finallyBlock) {
                return createTryStatement(tryBlock, catchClause, finallyBlock, node, node.flags);
            }
            return node;
        }

        export function createDebuggerStatement(location?: ts.TextRange, flags?: ts.NodeFlags): ts.Statement {
            var node = beginNode<ts.Statement>(ts.SyntaxKind.DebuggerStatement);
            return finishNode(node, location, flags);
        }

        export function createVariableDeclaration(name: ts.BindingPattern | ts.Identifier, initializer?: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.VariableDeclaration {
            var node = beginNode<ts.VariableDeclaration>(ts.SyntaxKind.VariableDeclaration);
            node.name = name;
            node.initializer = initializer;
            return finishNode(node, location, flags);
        }

        export function updateVariableDeclaration(node: ts.VariableDeclaration, name: ts.BindingPattern | ts.Identifier, initializer: ts.Expression): ts.VariableDeclaration {
            if (node.name !== name || node.initializer !== initializer) {
                return createVariableDeclaration(name, initializer, node, node.flags);
            }
            return node;
        }

        export function createVariableDeclarationList(declarations: ts.VariableDeclaration[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.VariableDeclarationList {
            var node = beginNode<ts.VariableDeclarationList>(ts.SyntaxKind.VariableDeclarationList);
            node.declarations = createNodeArray(declarations);
            return finishNode(node, location, flags);
        }

        export function updateVariableDeclarationList(node: ts.VariableDeclarationList, declarations: ts.VariableDeclaration[]): ts.VariableDeclarationList {
            if (node.declarations !== declarations) {
                return createVariableDeclarationList(declarations, node, node.flags);
            }
            return node;
        }

        export function createFunctionDeclaration(name: ts.Identifier, parameters: ts.ParameterDeclaration[], body: ts.Block, typeParameters?: ts.TypeParameterDeclaration[], type?: ts.TypeNode, modifiers?: ts.Node[], asteriskToken?: ts.Node, location?: ts.TextRange, flags?: ts.NodeFlags): ts.FunctionDeclaration {
            var node = beginNode<ts.FunctionDeclaration>(ts.SyntaxKind.FunctionDeclaration);
            node.name = name;
            node.parameters = createNodeArray(parameters);
            node.body = body;
            node.typeParameters = createNodeArray(typeParameters);
            node.type = type;
            node.modifiers = <ts.ModifiersArray>modifiers;
            node.asteriskToken = asteriskToken;
            return finishNode(node, location, flags, modifiers);
        }

        export function updateFunctionDeclaration(node: ts.FunctionDeclaration, name: ts.Identifier, parameters: ts.ParameterDeclaration[], body: ts.Block): ts.FunctionDeclaration {
            if (node.name !== name || node.parameters !== parameters || node.body !== body) {
                return createFunctionDeclaration(name, parameters, body, node.typeParameters, node.type, node.modifiers, node.asteriskToken, node, node.flags);
            }
            return node;
        }

        export function createCaseClause(expression: ts.Expression, statements: ts.Statement[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.CaseClause {
            var node = beginNode<ts.CaseClause>(ts.SyntaxKind.CaseClause);
            node.expression = expression;
            node.statements = createNodeArray(statements);
            return finishNode(node, location, flags);
        }

        export function updateCaseClause(node: ts.CaseClause, expression: ts.Expression, statements: ts.Statement[]): ts.CaseClause {
            if (node.expression !== expression || node.statements !== statements) {
                return createCaseClause(expression, statements, node, node.flags);
            }
            return node;
        }

        export function createDefaultClause(statements: ts.Statement[], location?: ts.TextRange, flags?: ts.NodeFlags): ts.DefaultClause {
            var node = beginNode<ts.DefaultClause>(ts.SyntaxKind.DefaultClause);
            node.statements = createNodeArray(statements);
            return finishNode(node, location, flags);
        }

        export function updateDefaultClause(node: ts.DefaultClause, statements: ts.Statement[]): ts.DefaultClause {
            if (node.statements !== statements) {
                return createDefaultClause(statements, node, node.flags);
            }
            return node;
        }

        export function createCatchClause(name: ts.VariableDeclaration, block: ts.Block, location?: ts.TextRange, flags?: ts.NodeFlags): ts.CatchClause {
            var node = beginNode<ts.CatchClause>(ts.SyntaxKind.CatchClause);
            node.variableDeclaration = name;
            node.block = block;
            return finishNode(node, location, flags);
        }

        export function updateCatchClause(node: ts.CatchClause, variableDeclaration: ts.VariableDeclaration, block: ts.Block): ts.CatchClause {
            if (node.variableDeclaration !== variableDeclaration || node.block !== block) {
                return createCatchClause(variableDeclaration, block, node, node.flags);
            }
            return node;
        }

        export function createPropertyAssignment(name: ts.DeclarationName, initializer: ts.Expression, location?: ts.TextRange, flags?: ts.NodeFlags): ts.PropertyAssignment {
            var node = beginNode<ts.PropertyAssignment>(ts.SyntaxKind.PropertyAssignment);
            node.name = name;
            node.initializer = initializer;
            return finishNode(node, location, flags);
        }

        export function updatePropertyAssignment(node: ts.PropertyAssignment, name: ts.DeclarationName, initializer: ts.Expression): ts.PropertyAssignment {
            if (node.name !== name || node.initializer !== initializer) {
                return createPropertyAssignment(name, initializer, node, node.flags);
            }
            return node;
        }

        export function createShorthandPropertyAssignment(name: ts.Identifier, location?: ts.TextRange, flags?: ts.NodeFlags): ts.ShorthandPropertyAssignment {
            var node = beginNode<ts.ShorthandPropertyAssignment>(ts.SyntaxKind.ShorthandPropertyAssignment);
            node.name = name;
            return finishNode(node, location, flags);
        }

        export function updateShorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, name: ts.Identifier): ts.ShorthandPropertyAssignment {
            if (node.name !== name) {
                return createShorthandPropertyAssignment(name, node, node.flags);
            }
            return node;
        }
    }

    export module Visitor {
        export function fallback<TNode extends ts.Node>(node: TNode, cbNode: Visitor, state?: any): TNode {
            if (!cbNode || !node) {
                return node;
            }
            return <TNode>accept(node, cbNode, state);
        }

        function accept(node: ts.Node, cbNode: Visitor, state?: any): ts.Node {
            switch (node.kind) {
                case ts.SyntaxKind.QualifiedName:
                    return Factory.updateQualifiedName(
                        <ts.QualifiedName>node,
                        visit<ts.EntityName>((<ts.QualifiedName>node).left, cbNode, state),
                        visit<ts.Identifier>((<ts.QualifiedName>node).right, cbNode, state));
                case ts.SyntaxKind.ComputedPropertyName:
                    return Factory.updateComputedPropertyName(
                        <ts.ComputedPropertyName>node,
                        visit<ts.Expression>((<ts.ComputedPropertyName>node).expression, cbNode, state));
                case ts.SyntaxKind.TypeParameter:
                    return Factory.updateTypeParameter(
                        <ts.TypeParameterDeclaration>node,
                        visit<ts.Identifier>((<ts.TypeParameterDeclaration>node).name, cbNode, state),
                        visit<ts.TypeNode>((<ts.TypeParameterDeclaration>node).constraint, cbNode, state));
                case ts.SyntaxKind.Parameter:
                    return Factory.updateParameterDeclaration(
                        <ts.ParameterDeclaration>node,
                        visit<ts.BindingPattern | ts.Identifier>((<ts.ParameterDeclaration>node).name, cbNode, state),
                        visit<ts.Expression>((<ts.ParameterDeclaration>node).initializer, cbNode, state),
                        visit<ts.TypeNode>((<ts.ParameterDeclaration>node).type, cbNode, state));
                case ts.SyntaxKind.PropertySignature:
                    return Factory.updatePropertySignature(
                        <ts.PropertyDeclaration>node,
                        visit<ts.DeclarationName>((<ts.PropertyDeclaration>node).name, cbNode, state),
                        visit<ts.TypeNode>((<ts.PropertyDeclaration>node).type, cbNode, state));
                case ts.SyntaxKind.PropertyDeclaration:
                    return Factory.updatePropertyDeclaration(
                        <ts.PropertyDeclaration>node,
                        visit<ts.DeclarationName>((<ts.PropertyDeclaration>node).name, cbNode, state),
                        visit<ts.Expression>((<ts.PropertyDeclaration>node).initializer, cbNode, state),
                        visit<ts.TypeNode>((<ts.PropertyDeclaration>node).type, cbNode, state));
                case ts.SyntaxKind.MethodSignature:
                    return Factory.updateMethodSignature(
                        <ts.MethodDeclaration>node,
                        visit<ts.DeclarationName>((<ts.MethodDeclaration>node).name, cbNode, state),
                        visitNodes<ts.ParameterDeclaration>((<ts.MethodDeclaration>node).parameters, cbNode, state));
                case ts.SyntaxKind.MethodDeclaration:
                    return Factory.updateMethodDeclaration(
                        <ts.MethodDeclaration>node,
                        visit<ts.DeclarationName>((<ts.MethodDeclaration>node).name, cbNode, state),
                        visitNodes<ts.ParameterDeclaration>((<ts.MethodDeclaration>node).parameters, cbNode, state),
                        visit<ts.Block>((<ts.MethodDeclaration>node).body, cbNode, state));
                case ts.SyntaxKind.Constructor:
                    return Factory.updateConstructor(
                        <ts.ConstructorDeclaration>node,
                        visitNodes<ts.ParameterDeclaration>((<ts.ConstructorDeclaration>node).parameters, cbNode, state),
                        visit<ts.Block>((<ts.ConstructorDeclaration>node).body, cbNode, state));
                case ts.SyntaxKind.GetAccessor:
                    return Factory.updateGetAccessor(
                        <ts.AccessorDeclaration>node,
                        visit<ts.DeclarationName>((<ts.AccessorDeclaration>node).name, cbNode, state),
                        visitNodes<ts.ParameterDeclaration>((<ts.AccessorDeclaration>node).parameters, cbNode, state),
                        visit<ts.Block>((<ts.AccessorDeclaration>node).body, cbNode, state));
                case ts.SyntaxKind.SetAccessor:
                    return Factory.updateSetAccessor(
                        <ts.AccessorDeclaration>node,
                        visit<ts.DeclarationName>((<ts.AccessorDeclaration>node).name, cbNode, state),
                        visitNodes<ts.ParameterDeclaration>((<ts.AccessorDeclaration>node).parameters, cbNode, state),
                        visit<ts.Block>((<ts.AccessorDeclaration>node).body, cbNode, state));
                case ts.SyntaxKind.CallSignature:
                    return Factory.updateCallSignature(
                        <ts.SignatureDeclaration>node,
                        visitNodes<ts.ParameterDeclaration>((<ts.SignatureDeclaration>node).parameters, cbNode, state));
                case ts.SyntaxKind.ConstructSignature:
                    return Factory.updateConstructSignature(
                        <ts.SignatureDeclaration>node,
                        visitNodes<ts.ParameterDeclaration>((<ts.SignatureDeclaration>node).parameters, cbNode, state));
                case ts.SyntaxKind.IndexSignature:
                    return Factory.updateIndexSignature(
                        <ts.IndexSignatureDeclaration>node,
                        visitNodes<ts.ParameterDeclaration>((<ts.IndexSignatureDeclaration>node).parameters, cbNode, state));
                case ts.SyntaxKind.ObjectBindingPattern:
                    return Factory.updateObjectBindingPattern(
                        <ts.BindingPattern>node,
                        visitNodes<ts.BindingElement>((<ts.BindingPattern>node).elements, cbNode, state));
                case ts.SyntaxKind.ArrayBindingPattern:
                    return Factory.updateArrayBindingPattern(
                        <ts.BindingPattern>node,
                        visitNodes<ts.BindingElement>((<ts.BindingPattern>node).elements, cbNode, state));
                case ts.SyntaxKind.BindingElement:
                    return Factory.updateBindingElement(
                        <ts.BindingElement>node,
                        visit<ts.BindingPattern | ts.Identifier>((<ts.BindingElement>node).name, cbNode, state),
                        visit<ts.Identifier>((<ts.BindingElement>node).propertyName, cbNode, state),
                        visit<ts.Expression>((<ts.BindingElement>node).initializer, cbNode, state));
                case ts.SyntaxKind.ArrayLiteralExpression:
                    return Factory.updateArrayLiteralExpression(
                        <ts.ArrayLiteralExpression>node,
                        visitNodes<ts.Expression>((<ts.ArrayLiteralExpression>node).elements, cbNode, state));
                case ts.SyntaxKind.ObjectLiteralExpression:
                    return Factory.updateObjectLiteralExpression(
                        <ts.ObjectLiteralExpression>node,
                        visitNodes<ts.ObjectLiteralElement>((<ts.ObjectLiteralExpression>node).properties, cbNode, state));
                case ts.SyntaxKind.PropertyAccessExpression:
                    return Factory.updatePropertyAccessExpression(
                        <ts.PropertyAccessExpression>node,
                        visit<ts.LeftHandSideExpression>((<ts.PropertyAccessExpression>node).expression, cbNode, state),
                        visit<ts.Identifier>((<ts.PropertyAccessExpression>node).name, cbNode, state));
                case ts.SyntaxKind.ElementAccessExpression:
                    return Factory.updateElementAccessExpression(
                        <ts.ElementAccessExpression>node,
                        visit<ts.LeftHandSideExpression>((<ts.ElementAccessExpression>node).expression, cbNode, state),
                        visit<ts.Expression>((<ts.ElementAccessExpression>node).argumentExpression, cbNode, state));
                case ts.SyntaxKind.CallExpression:
                    return Factory.updateCallExpression(
                        <ts.CallExpression>node,
                        visit<ts.LeftHandSideExpression>((<ts.CallExpression>node).expression, cbNode, state),
                        visitNodes<ts.Expression>((<ts.CallExpression>node).arguments, cbNode, state));
                case ts.SyntaxKind.NewExpression:
                    return Factory.updateNewExpression(
                        <ts.NewExpression>node,
                        visit<ts.LeftHandSideExpression>((<ts.NewExpression>node).expression, cbNode, state),
                        visitNodes<ts.Expression>((<ts.NewExpression>node).arguments, cbNode, state));
                case ts.SyntaxKind.TaggedTemplateExpression:
                    return Factory.updateTaggedTemplateExpression(
                        <ts.TaggedTemplateExpression>node,
                        visit<ts.LeftHandSideExpression>((<ts.TaggedTemplateExpression>node).tag, cbNode, state),
                        visit<ts.LiteralExpression | ts.TemplateExpression>((<ts.TaggedTemplateExpression>node).template, cbNode, state));
                case ts.SyntaxKind.TypeAssertionExpression:
                    return Factory.updateTypeAssertion(
                        <ts.TypeAssertion>node,
                        visit<ts.UnaryExpression>((<ts.TypeAssertion>node).expression, cbNode, state));
                case ts.SyntaxKind.ParenthesizedExpression:
                    return Factory.updateParenthesizedExpression(
                        <ts.ParenthesizedExpression>node,
                        visit<ts.Expression>((<ts.ParenthesizedExpression>node).expression, cbNode, state));
                case ts.SyntaxKind.FunctionExpression:
                    return Factory.updateFunctionExpression(
                        <ts.FunctionExpression>node,
                        visit<ts.Identifier>((<ts.FunctionExpression>node).name, cbNode, state),
                        visitNodes<ts.ParameterDeclaration>((<ts.FunctionExpression>node).parameters, cbNode, state),
                        visit<ts.Block | ts.Expression>((<ts.FunctionExpression>node).body, cbNode, state));
                case ts.SyntaxKind.ArrowFunction:
                    return Factory.updateArrowFunction(
                        <ts.FunctionExpression>node,
                        visitNodes<ts.ParameterDeclaration>((<ts.FunctionExpression>node).parameters, cbNode, state),
                        visit<ts.Block | ts.Expression>((<ts.FunctionExpression>node).body, cbNode, state));
                case ts.SyntaxKind.DeleteExpression:
                    return Factory.updateDeleteExpression(
                        <ts.DeleteExpression>node,
                        visit<ts.UnaryExpression>((<ts.DeleteExpression>node).expression, cbNode, state));
                case ts.SyntaxKind.TypeOfExpression:
                    return Factory.updateTypeOfExpression(
                        <ts.TypeOfExpression>node,
                        visit<ts.UnaryExpression>((<ts.TypeOfExpression>node).expression, cbNode, state));
                case ts.SyntaxKind.VoidExpression:
                    return Factory.updateVoidExpression(
                        <ts.VoidExpression>node,
                        visit<ts.UnaryExpression>((<ts.VoidExpression>node).expression, cbNode, state));
                case ts.SyntaxKind.AwaitExpression:
                    return Factory.updateAwaitExpression(
                        <ts.AwaitExpression>node,
                        visit<ts.UnaryExpression>((<ts.AwaitExpression>node).expression, cbNode, state));
                case ts.SyntaxKind.PrefixUnaryExpression:
                    return Factory.updatePrefixUnaryExpression(
                        <ts.PrefixUnaryExpression>node,
                        visit<ts.UnaryExpression>((<ts.PrefixUnaryExpression>node).operand, cbNode, state));
                case ts.SyntaxKind.PostfixUnaryExpression:
                    return Factory.updatePostfixUnaryExpression(
                        <ts.PostfixUnaryExpression>node,
                        visit<ts.LeftHandSideExpression>((<ts.PostfixUnaryExpression>node).operand, cbNode, state));
                case ts.SyntaxKind.BinaryExpression:
                    return Factory.updateBinaryExpression(
                        <ts.BinaryExpression>node,
                        visit<ts.Expression>((<ts.BinaryExpression>node).left, cbNode, state),
                        visit<ts.Expression>((<ts.BinaryExpression>node).right, cbNode, state));
                case ts.SyntaxKind.ConditionalExpression:
                    return Factory.updateConditionalExpression(
                        <ts.ConditionalExpression>node,
                        visit<ts.Expression>((<ts.ConditionalExpression>node).condition, cbNode, state),
                        visit<ts.Expression>((<ts.ConditionalExpression>node).whenTrue, cbNode, state),
                        visit<ts.Expression>((<ts.ConditionalExpression>node).whenFalse, cbNode, state));
                case ts.SyntaxKind.TemplateExpression:
                    return Factory.updateTemplateExpression(
                        <ts.TemplateExpression>node,
                        visit<ts.LiteralExpression>((<ts.TemplateExpression>node).head, cbNode, state),
                        visitNodes<ts.TemplateSpan>((<ts.TemplateExpression>node).templateSpans, cbNode, state));
                case ts.SyntaxKind.YieldExpression:
                    return Factory.updateYieldExpression(
                        <ts.YieldExpression>node,
                        visit<ts.Expression>((<ts.YieldExpression>node).expression, cbNode, state));
                case ts.SyntaxKind.SpreadElementExpression:
                    return Factory.updateSpreadElementExpression(
                        <ts.SpreadElementExpression>node,
                        visit<ts.Expression>((<ts.SpreadElementExpression>node).expression, cbNode, state));
                case ts.SyntaxKind.TemplateSpan:
                    return Factory.updateTemplateSpan(
                        <ts.TemplateSpan>node,
                        visit<ts.Expression>((<ts.TemplateSpan>node).expression, cbNode, state),
                        visit<ts.LiteralExpression>((<ts.TemplateSpan>node).literal, cbNode, state));
                case ts.SyntaxKind.Block:
                    return Factory.updateBlock(
                        <ts.Block>node,
                        visitNodes<ts.Statement>((<ts.Block>node).statements, cbNode, state));
                case ts.SyntaxKind.VariableStatement:
                    return Factory.updateVariableStatement(
                        <ts.VariableStatement>node,
                        visit<ts.VariableDeclarationList>((<ts.VariableStatement>node).declarationList, cbNode, state));
                case ts.SyntaxKind.ExpressionStatement:
                    return Factory.updateExpressionStatement(
                        <ts.ExpressionStatement>node,
                        visit<ts.Expression>((<ts.ExpressionStatement>node).expression, cbNode, state));
                case ts.SyntaxKind.IfStatement:
                    return Factory.updateIfStatement(
                        <ts.IfStatement>node,
                        visit<ts.Expression>((<ts.IfStatement>node).expression, cbNode, state),
                        visit<ts.Statement>((<ts.IfStatement>node).thenStatement, cbNode, state),
                        visit<ts.Statement>((<ts.IfStatement>node).elseStatement, cbNode, state));
                case ts.SyntaxKind.DoStatement:
                    return Factory.updateDoStatement(
                        <ts.DoStatement>node,
                        visit<ts.Statement>((<ts.DoStatement>node).statement, cbNode, state),
                        visit<ts.Expression>((<ts.DoStatement>node).expression, cbNode, state));
                case ts.SyntaxKind.WhileStatement:
                    return Factory.updateWhileStatement(
                        <ts.WhileStatement>node,
                        visit<ts.Expression>((<ts.WhileStatement>node).expression, cbNode, state),
                        visit<ts.Statement>((<ts.WhileStatement>node).statement, cbNode, state));
                case ts.SyntaxKind.ForStatement:
                    return Factory.updateForStatement(
                        <ts.ForStatement>node,
                        visit<ts.Expression | ts.VariableDeclarationList>((<ts.ForStatement>node).initializer, cbNode, state),
                        visit<ts.Expression>((<ts.ForStatement>node).condition, cbNode, state),
                        visit<ts.Expression>((<ts.ForStatement>node).incrementor, cbNode, state),
                        visit<ts.Statement>((<ts.ForStatement>node).statement, cbNode, state));
                case ts.SyntaxKind.ForInStatement:
                    return Factory.updateForInStatement(
                        <ts.ForInStatement>node,
                        visit<ts.Expression | ts.VariableDeclarationList>((<ts.ForInStatement>node).initializer, cbNode, state),
                        visit<ts.Expression>((<ts.ForInStatement>node).expression, cbNode, state),
                        visit<ts.Statement>((<ts.ForInStatement>node).statement, cbNode, state));
                case ts.SyntaxKind.ContinueStatement:
                    return Factory.updateContinueStatement(
                        <ts.BreakOrContinueStatement>node,
                        visit<ts.Identifier>((<ts.BreakOrContinueStatement>node).label, cbNode, state));
                case ts.SyntaxKind.BreakStatement:
                    return Factory.updateBreakStatement(
                        <ts.BreakOrContinueStatement>node,
                        visit<ts.Identifier>((<ts.BreakOrContinueStatement>node).label, cbNode, state));
                case ts.SyntaxKind.ReturnStatement:
                    return Factory.updateReturnStatement(
                        <ts.ReturnStatement>node,
                        visit<ts.Expression>((<ts.ReturnStatement>node).expression, cbNode, state));
                case ts.SyntaxKind.WithStatement:
                    return Factory.updateWithStatement(
                        <ts.WithStatement>node,
                        visit<ts.Expression>((<ts.WithStatement>node).expression, cbNode, state),
                        visit<ts.Statement>((<ts.WithStatement>node).statement, cbNode, state));
                case ts.SyntaxKind.SwitchStatement:
                    return Factory.updateSwitchStatement(
                        <ts.SwitchStatement>node,
                        visit<ts.Expression>((<ts.SwitchStatement>node).expression, cbNode, state),
                        visit<ts.CaseBlock>((<ts.SwitchStatement>node).caseBlock, cbNode, state));
                case ts.SyntaxKind.LabeledStatement:
                    return Factory.updateLabeledStatement(
                        <ts.LabeledStatement>node,
                        visit<ts.Identifier>((<ts.LabeledStatement>node).label, cbNode, state),
                        visit<ts.Statement>((<ts.LabeledStatement>node).statement, cbNode, state));
                case ts.SyntaxKind.ThrowStatement:
                    return Factory.updateThrowStatement(
                        <ts.ThrowStatement>node,
                        visit<ts.Expression>((<ts.ThrowStatement>node).expression, cbNode, state));
                case ts.SyntaxKind.TryStatement:
                    return Factory.updateTryStatement(
                        <ts.TryStatement>node,
                        visit<ts.Block>((<ts.TryStatement>node).tryBlock, cbNode, state),
                        visit<ts.CatchClause>((<ts.TryStatement>node).catchClause, cbNode, state),
                        visit<ts.Block>((<ts.TryStatement>node).finallyBlock, cbNode, state));
                case ts.SyntaxKind.VariableDeclaration:
                    return Factory.updateVariableDeclaration(
                        <ts.VariableDeclaration>node,
                        visit<ts.BindingPattern | ts.Identifier>((<ts.VariableDeclaration>node).name, cbNode, state),
                        visit<ts.Expression>((<ts.VariableDeclaration>node).initializer, cbNode, state));
                case ts.SyntaxKind.VariableDeclarationList:
                    return Factory.updateVariableDeclarationList(
                        <ts.VariableDeclarationList>node,
                        visitNodes<ts.VariableDeclaration>((<ts.VariableDeclarationList>node).declarations, cbNode, state));
                case ts.SyntaxKind.FunctionDeclaration:
                    return Factory.updateFunctionDeclaration(
                        <ts.FunctionDeclaration>node,
                        visit<ts.Identifier>((<ts.FunctionDeclaration>node).name, cbNode, state),
                        visitNodes<ts.ParameterDeclaration>((<ts.FunctionDeclaration>node).parameters, cbNode, state),
                        visit<ts.Block>((<ts.FunctionDeclaration>node).body, cbNode, state));
                case ts.SyntaxKind.CaseClause:
                    return Factory.updateCaseClause(
                        <ts.CaseClause>node,
                        visit<ts.Expression>((<ts.CaseClause>node).expression, cbNode, state),
                        visitNodes<ts.Statement>((<ts.CaseClause>node).statements, cbNode, state));
                case ts.SyntaxKind.DefaultClause:
                    return Factory.updateDefaultClause(
                        <ts.DefaultClause>node,
                        visitNodes<ts.Statement>((<ts.DefaultClause>node).statements, cbNode, state));
                case ts.SyntaxKind.CatchClause:
                    return Factory.updateCatchClause(
                        <ts.CatchClause>node,
                        visit<ts.VariableDeclaration>((<ts.CatchClause>node).variableDeclaration, cbNode, state),
                        visit<ts.Block>((<ts.CatchClause>node).block, cbNode, state));
                case ts.SyntaxKind.PropertyAssignment:
                    return Factory.updatePropertyAssignment(
                        <ts.PropertyAssignment>node,
                        visit<ts.DeclarationName>((<ts.PropertyAssignment>node).name, cbNode, state),
                        visit<ts.Expression>((<ts.PropertyAssignment>node).initializer, cbNode, state));
                case ts.SyntaxKind.ShorthandPropertyAssignment:
                    return Factory.updateShorthandPropertyAssignment(
                        <ts.ShorthandPropertyAssignment>node,
                        visit<ts.Identifier>((<ts.ShorthandPropertyAssignment>node).name, cbNode, state));
                default:
                    return node;
            }
        }
    }

    export module Factory {
        export function isLeftHandSideExpression(expr: ts.Node): boolean {
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
        export function createNodeArray<TNode extends ts.Node>(elements: TNode[] = [], location?: ts.TextRange): ts.NodeArray<TNode> {
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

        export function createVoidZero(location?: ts.TextRange, flags?: ts.NodeFlags): ts.VoidExpression {
            return createVoidExpression(createNumericLiteral(0, location, flags), location, flags);
        }

        export function makeLeftHandSideExpression(expression: ts.Expression): ts.LeftHandSideExpression {
            if (isLeftHandSideExpression(expression)) {
                return <ts.LeftHandSideExpression>expression;
            }

            return createParenthesizedExpression(expression);
        }

        export function createPropertyOrElementAccessExpression(expression: ts.LeftHandSideExpression, propName: ts.Identifier | ts.LiteralExpression): ts.LeftHandSideExpression {
            if (propName.kind !== ts.SyntaxKind.Identifier) {
                return createElementAccessExpression(expression, propName);
            }
            return createPropertyAccessExpression(expression, <ts.Identifier>propName);
        }

        export function updateFunctionLikeDeclaration(node: ts.FunctionLikeDeclaration, name: ts.DeclarationName, body: ts.Expression | ts.Block, parameters: ts.ParameterDeclaration[]): ts.FunctionLikeDeclaration {
            switch (node.kind) {
                case ts.SyntaxKind.FunctionDeclaration:
                    return updateFunctionDeclaration(<ts.FunctionDeclaration>node, <ts.Identifier>name, parameters, <ts.Block>body);
                case ts.SyntaxKind.MethodDeclaration:
                    return updateMethodDeclaration(<ts.MethodDeclaration>node, name, parameters, <ts.Block>body);
                case ts.SyntaxKind.GetAccessor:
                    return updateGetAccessor(<ts.AccessorDeclaration>node, name, parameters, <ts.Block>body);
                case ts.SyntaxKind.FunctionExpression:
                    return updateFunctionExpression(<ts.FunctionExpression>node, <ts.Identifier>name, parameters, body);
                case ts.SyntaxKind.ArrowFunction:
                    return updateArrowFunction(<ts.FunctionExpression>node, parameters, body);
            }
            return node;
        }

        // statements
        export function getExpressionForEntityName(name: ts.EntityName): ts.LeftHandSideExpression {
            if (!name) {
                return finishNode(beginNode<ts.LeftHandSideExpression>(ts.SyntaxKind.NullKeyword));
            }

            if (name.kind === ts.SyntaxKind.Identifier) {
                return createIdentifier((<ts.Identifier>name).text);
            }
            else {
                return createPropertyAccessExpression(getExpressionForEntityName((<ts.QualifiedName>name).left), createIdentifier((<ts.QualifiedName>name).right.text));
            }
        }

        export function createTokenNode(token: ts.SyntaxKind, location?: ts.TextRange, flags?: ts.NodeFlags): ts.Node {
            return finishNode(beginNode(token), location, flags);
        }

        export function beginNode<TNode extends ts.Node>(kind: ts.SyntaxKind): TNode {
            var ctor = ts.getNodeConstructor(kind);
            var node = <TNode>(new ctor());
            return node;
        }

        export function finishNode<TNode extends ts.Node>(node: TNode, location?: ts.TextRange, flags?: ts.NodeFlags, modifiers?: ts.Node[]): TNode {
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

            ts.forEachChild(node, child => childAdded(node, child));
            return node;
        }

        function childAdded(parent: ts.Node, child: ts.Node): void {
            if (child && !child.parent) {
                child.parent = parent;
            }
        }
    }

    export interface Visitor { <TNode extends ts.Node>(node: TNode, state?: any): TNode; }

    export module Visitor {
        export function visit<TNode extends ts.Node>(node: TNode, cbNode: Visitor, state?: any): TNode {
            if (!cbNode || !node) {
                return node;
            }

            return <TNode>cbNode(node, state);
        }

        export function visitNodes<TNode extends ts.Node>(nodes: ts.NodeArray<TNode>, cbNode: Visitor, state?: any, shouldCacheNode?: (node: ts.Node, state: any) => boolean, cacheNode?: (node: TNode, state: any) => TNode, removeMissingNodes?: boolean): ts.NodeArray<TNode> {
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
                var updatedNode = <TNode>visit(node, cbNode, state);
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
}
