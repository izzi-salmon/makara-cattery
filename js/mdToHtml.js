// Markdown to HTML tool

// Wait till page has loaded
window.onload = function() {
  const outputElement = document.getElementById("termsAndConditionsOutput");

  // fetch md file and store
  fetch('../documents/makara-cattery-terms-and-conditions.md')
    .then(response => response.text())
    .then(text => {
      if(text && outputElement) {
        outputElement.innerHTML = convertMarkdownToHtml(text);
      }
    })
    .catch(error => {
      console.error('Error fetching markdown:', error)
    });

  function convertMarkdownToHtml(markdown) {
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
        else if (/^[-*] /.test(line)) {
          if (!inList) {
            inList = true;
            html += '<ul>\n';
          }
          const item = line.replace(/^[-*] /, '');
          html += `<li>${item}</li>\n`;
        }
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
          let text = line
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italics
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Handle dash escape
            .replace(/\\\-/g, '-')
            // Handle numbered line (that's not ordered list) escape
            .replace(/\d\\\./g, `${line.match(/\d/)}.`);
          // Paragraph
          html += `<p>${text}</p>\n`;
        }
      });
    
      if (inList) {
        html += '</ul>\n';
      }

      console.log(html);
    
      return html;
    }

}