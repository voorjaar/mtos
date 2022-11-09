---
layout: post
title: "How Does it Work?"
date: 2022-10-12 11:44:21 +0800
categories: jekyll update
---

Dillinger makes writing in Markdown easy because it hides the stuff happening behind the scenes, but it’s worth exploring how the process works in general.

When you write in Markdown, the text is stored in a plaintext file that has an `.md` or `.markdown` extension. But then what? How is your Markdown-formatted file converted into HTML or a print-ready document?

The short answer is that you need a _Markdown application_ capable of processing the Markdown file. There are lots of applications available — everything from simple scripts to desktop applications that look like Microsoft Word. Despite their visual differences, all of the applications do the same thing. Like Dillinger, they all convert Markdown-formatted text to HTML so it can be displayed in web browsers.

Markdown applications use something called a _Markdown processor_ (also commonly referred to as a “parser” or an “implementation”) to take the Markdown-formatted text and output it to HTML format. At that point, your document can be viewed in a web browser or combined with a style sheet and printed. You can see a visual representation of this process below.

**Note:** The Markdown application and processor are two separate components. For the sake of brevity, I've combined them into one element ("Markdown app") in the figure below.

![The Markdown Process](https://mdg.imgix.net/assets/images/markdown-flowchart.png)

To summarize, this is a four-part process:

1.  Create a Markdown file using a text editor or a dedicated Markdown application. The file should have an `.md` or `.markdown` extension.
2.  Open the Markdown file in a Markdown application.
3.  Use the Markdown application to convert the Markdown file to an HTML document.
4.  View the HTML file in a web browser or use the Markdown application to convert it to another file format, like PDF.

From your perspective, the process will vary somewhat depending on the application you use. For example, Dillinger essentially combines steps 1-3 into a single, seamless interface — all you have to do is type in the left pane and the rendered output magically appears in the right pane. But if you use other tools, like a text editor with a static website generator, you’ll find that the process is much more visible.

<div class="row">
  <a href="/jekyll/update/2022/10/11/why-use-markdown.html">Prev: Why use Markdown?</a>
  <a href="/jekyll/update/2022/10/13/what-is-markdown-good-for.html">Next: What is Markdown Good For?</a>
</div>
