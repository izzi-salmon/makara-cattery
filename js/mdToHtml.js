// Markdown to HTML tool

function convertMarkdownToHtml(markdown) {

    console.log(markdown);

    // Escape HTML
    markdown = markdown.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
    const lines = markdown.split('\n');
    let html = '';
    let inList = false;
  
    lines.forEach(line => {
      // Headings
      if (/^#{1,6}\s/.test(line)) {
        const level = line.match(/^#+/)[0].length;
        const text = line.replace(/^#{1,6}\s/, '');
        html += `<h${level}>${text}</h${level}>\n`;
      }
      // Unordered list
      else if (/^- /.test(line)) {
        if (!inList) {
          inList = true;
          html += '<ul>\n';
        }
        const item = line.replace(/^- /, '');
        html += `<li>${item}</li>\n`;
      }
      // Paragraph
      else if (line.trim() === '') {
        if (inList) {
          inList = false;
          html += '</ul>\n';
        }
        html += '\n';
      } else {
        if (inList) {
          inList = false;
          html += '</ul>\n';
        }
        // Bold and Italics
        let text = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
        html += `<p>${text}</p>\n`;
      }
    });
  
    if (inList) {
      html += '</ul>\n';
    }
  
    return html;
  }

  const input = document.getElementById("markdown-input").value;
  const output = document.getElementById("output");

  output.innerHTML = convertMarkdownToHtml(input);